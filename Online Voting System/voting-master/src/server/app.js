const config = require('./config');

const data = require('./data')(config);
const app = require('./config/app')({config});
const controllers = require('./controllers')({data, config});
require('./routers')(app, controllers, {config});

const server = app.listen(config.port, config.ip, () => {
  console.log(`App running on localhost:${server.address().port}`);
});

