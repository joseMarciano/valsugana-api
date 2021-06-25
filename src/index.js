const server = require('./config/server');
const cors = require('cors');
const mainRoute = require('./api/routes');

(async function () {
    server
        .use('/api',cors(), mainRoute)
        .listen(process.env.PORT || 3000, () => console.log('Server is running'))
})()
