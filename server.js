const data = require('./db.js');

const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router(data);
const authRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.db = authRouter.db;

server.use(middlewares);

const rules = auth.rewriter({
  users: 640,
  conversations: 660,
  messages: 660,
});

server.use(rules);
server.use(middlewares);
server.use(router);
server.use(authRouter);

server.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
