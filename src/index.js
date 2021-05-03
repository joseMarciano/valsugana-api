const server = require('./config/server');
const mainRoute = require('./api/routes');

(async function () {
    server
        .use('/api', mainRoute)
        .listen(3000, () => console.log('Server is running'))


})()
