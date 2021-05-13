const Representation = require('./Representation');
const { Ensaio, Dancarino, PessoaFisica } = require('../index');
class EnsaioRepresentation {

    static completa() {
        return new Representation(Ensaio)
            .field('id')
            .field('descricao')
            .include(Dancarino, 'dancarinosEnsaio', ['id','descricao', 'vigencia'])
            .includeIn('dancarinosEnsaio', [PessoaFisica, 'pessoaFisicaDancarino'], ['id', 'nome']).add()
            // .includeIn('pessoaFisicaDancarino', [PessoaFisica, 'responsavelPessoaFisica']) //VERIFICAR O PORQUE NESSE CASO RETORNA U OBJETO VAZIO AO INVES DOS FIELDS PASSADOS
            .build();
    }

    static listagem() {
        return new Representation(Ensaio)
            .field('id')
            .field('descricao')
            .build();

    }
}

module.exports = EnsaioRepresentation;