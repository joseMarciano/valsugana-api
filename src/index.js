const server = require('./config/server');
const { PessoaFisica, Dancarino, Chamada } = require('./api/models/index');

(async function () {
    // const pessoaFisica = {
    //     nome: 'José',
    // }

    // const pessoaFisicaModel = await PessoaFisica.create(pessoaFisica);
    // const dancarino = await Dancarino.findByPk(1);

    // const chamadaReq = {
    //     vigencia: new Date(),
    //     descricao: 'Descrição',
    //     chamadasDancarinos: [{
    //         dancarinoId: 1,

    //     }]
    // }
    debugger

})()

server.listen(3000, () => console.log('Server is running'))