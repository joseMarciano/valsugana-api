module.exports = (options = {}) => {
    if (typeof options === 'string' && options.length > 0)
        options = JSON.parse(options);

    if (typeof options === 'string' && options.length === 0)
        options = {};

    return options;
}