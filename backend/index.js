/**
 * Module Dependencies
 */
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const config = require('./config');

/**
 * Initialize Server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version,
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Start Server, Connect to DB & Require Routes
 */
server.listen(config.port, () => {
  require('./routes')(server);
  console.log(`Server is listening on port ${config.port}`);
});
