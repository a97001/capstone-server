const cluster = require('cluster');
const os = require('os');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
// const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('./config/env');
const http = require('http');
const app = require('./config/express');
const validate = require('express-validation');

validate.options({
  allowUnknownBody: true,
  allowUnknownQuery: true,
  allowUnknownParams: true
});

if (process.env.NODE_ENV === 'production') {
  console.log('----------Production----------');
  init();
  // if (cluster.isMaster) {
  //   const numWorkers = os.cpus().length;
  //
  //   console.log(`Master cluster setting up ${numWorkers} workers... `); // eslint-disable-line no-console
  //
  //   for (let i = 0; i < numWorkers; i++) {
  //     cluster.fork();
  //   }
  //
  //   cluster.on('online', (worker) => {
  //     console.log(`Worker ${worker.process.pid} is online`); // eslint-disable-line no-console
  //   });
  //
  //   cluster.on('exit', (worker, code, signal) => {
  //     console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`); // eslint-disable-line no-console
  //     console.log('Starting a new worker'); // eslint-disable-line no-console
  //     cluster.fork();
  //   });
  // } else {
  //   init();
  // }
} else {
  console.log('----------Development----------');
  init();
  process.on('unhandledRejection', (reason) => {
    console.log(reason);
  });
}

function init() {
  const server = http.createServer(app);
  console.log(config.db); // eslint-disable-line no-console

  // promisify mongoose
  // Promise.promisifyAll(mongoose);
  mongoose.Promise = global.Promise;
  // connect to mongo db
  mongoose.connect(config.db, {
    mongos: config.mongos,
    server: {
      poolSize: 35,
      auto_reconnect: true,
      reconnectTries: Number.MAX_VALUE,
      socketOptions: { socketTimeoutMS: 0, connectTimeoutMS: 0 }
    }
  });
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`);
  });

  mongoose.connection.on('connected', () => {
    // listen on port config.port
    server.listen(config.port, () => {
      debug(`server started on port ${config.port} (${config.env})`);
    });
  });

  mongoose.connection.on('disconnected', () => console.log(`Disconnect to database: ${config.db}`));
  module.exports = app;
}
