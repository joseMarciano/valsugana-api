const _ = require('lodash');

class Representation {

    constructor(model = null) {
        this._model = model;
        this._attributes = Object.keys(model.rawAttributes);
        this._alias = null;
        this._attributesToShow = [];
        this._include = [];
        this._includeCache = [];

        if (!this._model) throw new Error('model is required')
    }

    field(field) {
        const attr = this._attributes.find(attr => attr === field);

        if (!attr) throw new Error(`Field '${field}' not found`);
        this._attributesToShow.push(attr)
        return this;
    }


    include(model = null, alias = null, fields = ['id'], through = null) {
        if (!model) throw new Error('model is required, include prop');
        if (!alias) throw new Error('alias is required, include prop');

        const attrs = this.#findAttrsModel(model, fields);
        let include = { model: model, as: alias, attributes: attrs };

        if (_.isArray(through)) include = { ...include, through: { attributes: through } }

        this._include = include;

        return this;
    }

    includeIn(alias = null, model = [], fields = ['id']) {

        if (_.isEmpty(this._include)) throw new Error('include builder is required before includeIn')
        if (!alias) throw new Error('alias is required, includeIn prop');
        if (!model.length) throw new Error('model is required, includeIn prop');

        const attrs = this.#findAttrsModel(model[0], fields);

        if (this._include && this._include.as === alias) {
            this.#buildInclude(this._include, model, attrs);
            return this;
        }

        this.#setAssociation(this._include['include'], alias, model, attrs);
        return this;
    }

    add() {
        this._includeCache.push(this._include);
        this._include = [];
        return this;
    }


    build() {
        const options = {
            attributes: { exclude: this.#attributes() },
            include: this.#includes()
        }
        return options;
    }

    #attributes() {
        return this._attributes.filter((attr) => this._attributesToShow.indexOf(attr) === -1);
    }

    #includes() {
        return this._includeCache;
    }

    #setAssociation(include, alias, model, attrs) {
        if (!include.length) return;
        include.forEach(inc => {
            if (inc && inc.as === alias) {
                this.#buildInclude(inc, model, attrs);
                return;
            }
            if (inc && include.as !== alias) {
                this.#setAssociation(inc['include'], alias, model, attrs);
            }

        });
        //         if (!include) return;
        //         if (include && include.as === alias) {
        //             this.#buildInclude(include, model, attrs);
        //             return;
        //         }
        //         if (include && include.as !== alias) {
        //             this.#setAssociation(include['include'], alias, model, attrs);
        //         }

    }

    #findAttrsModel(model, attrs) {
        if (_.isEmpty(attrs)) throw new Error('attrs is required, #findAttrsModel');
        const attributes = Object.keys(model.rawAttributes).filter(rawAttribute => attrs.indexOf(rawAttribute) !== -1);
        return attributes
    }

    #buildInclude(association, model, attrs) {
        association.include = [];
        association.include.push({ model: model[0], as: model[1], attributes: attrs });
    }

}

module.exports = Representation;