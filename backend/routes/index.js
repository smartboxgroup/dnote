/**
 * Module Dependencies
 */
const errors = require('restify-errors');
const md5 = require('md5');

const redis = require('redis');

const redisClient = redis.createClient(6379, 'redis');

redisClient.on('error', (err) => {
  console.log(`Error ${err}`);
});

module.exports = function (server) {
  /**
     * POST
     */
  server.post('/notes', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'"),
      );
    }

    const data = req.body || {};

    function getRandomString() {
      return md5(Math.random()).substring(0, 6);
    }


    function saveNote(key, data) {
      redisClient.get(key, (err, result) => {
        if (result === null) {
          redisClient.set(key, data.note, redis.print);
          return res.send({ id: key });
        }

        saveNote(getRandomString());
      });
    }

    saveNote(getRandomString(), data);
    next();
  });

  /**
     * GET
     */
  server.get('/notes/:note_id', (req, res, next) => {
    redisClient.get(req.params.note_id, (err, result) => {
      if (result != null) {
        redisClient.del(req.params.note_id);
        res.send(result);
      } else {
        res.send(404);
      }
    });

    next();
  });
};
