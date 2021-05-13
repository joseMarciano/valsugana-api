const Representation = require('./Representation');
const { Dancarino, PessoaFisica } = require('../index');
class ChamadaRepresentation {

    static completa() {
        return new Representation(Dancarino)
            .field('id')
            .field('descricao')
            .field('vigencia')
            .field('desabilitado')
            .include(PessoaFisica, 'pessoaFisicaDancarino', ['id','nome'])
            .includeIn('pessoaFisicaDancarino', [PessoaFisica, 'responsavelPessoaFisica'], ['id','nome']).add()
            .build();
    }

    static listagem() {
        return new Representation(Dancarino)
            .field('id')
            .field('descricao')
            .field('vigencia')
            .field('desabilitado')
            .include(PessoaFisica, 'pessoaFisicaDancarino', ['id','nome']).add()
            .build();

    }
}

module.exports = ChamadaRepresentation;