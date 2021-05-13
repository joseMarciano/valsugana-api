const Representation = require('./Representation');
const { Chamada, EnsaioDancarino, Dancarino, PessoaFisica, Ensaio } = require('../index');
class ChamadaRepresentation {

    static completa() {
        return new Representation(Chamada)
            .field('id')
            .field('descricao')
            .field('vigencia')
            .field('ensaioId')
            .include(EnsaioDancarino, 'ensaiosDancarinosChamada', ['id'],['id','observacao','presente'])
            .includeIn('ensaiosDancarinosChamada', [Dancarino, 'dancarino'], ['id'])
            .includeIn('dancarino', [PessoaFisica, 'pessoaFisicaDancarino'], ['id', 'nome']).add()
            .build();
    }

    static listagem() {
        return new Representation(Ensaio)
            .field('id')
            .field('descricao')
            .build();

    }
}

module.exports = ChamadaRepresentation;