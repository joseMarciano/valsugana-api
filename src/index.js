const server = require('./config/server');
const { PessoaFisica } = require('./api/models/index');


server.listen(3000, () => console.log('Server is running'))