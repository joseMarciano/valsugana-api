const Representation = require('./Representation');
const { PessoaFisica } = require('../index');
class PessoaFisicaRepresentation {

    static completa() {
        return new Representation(PessoaFisica)
            .field('id')
            .field('nome')
            .field('cpf')
            .field('endereco')
            .field('telefone')
            .field('dataNascimento')
            .field('responsavelId')
            .include(PessoaFisica, 'responsavelPessoaFisica', ['id','nome']).add()
            .build();
    }

    static listagem() {
        return new Representation(PessoaFisica)
            .field('id')
            .field('nome')
            .field('cpf')
            .build();

    }
}

module.exports = PessoaFisicaRepresentation;