// const fastify = require('fastify'); // [1]
import fastify from 'fastify';
import { CommentRemoverJs } from './service/CommentRemoverJs.js';
import { CodeConversionInputMsg, CodeConversionOutputMsg } from './msgSchema/CodeConversionMsgSchema.js';

const serverOptions = {
  logger: true,
};
const app = fastify(serverOptions); // [3]

// ######## vvvvv test-learn
// ######## vvvvv test-learn
// ######## vvvvv test-learn
// ######## vvvvv test-learn

app.addHook('onRoute', function inspector(routeOptions) {
  console.log(routeOptions);
});
app.addHook('onRegister', function inspector(plugin, pluginOptions) {
  console.log('Chapter 2, Plugin System and Boot Process');
});
// app.addHook('onReady', function preLoading(done) {
//   console.log('onReady');
//   done();
// });
// app.addHook('onClose', function manageClose(done) {
//   console.log('onClose');
//   done();
// });
app.addHook('onReady', async function preLoading() {
  console.log('async onReady');
  // the done argument is gone!
});
app.addHook('onClose', async function manageClose() {
  console.log('onClose');
});

app.route({
  url: '/hello',
  method: 'GET',
  handler: function myHandler(request, reply) {
    reply.send('world');
  },
});

// app.get(url, handlerFunction); // [1]
// app.get(url, { // [2]
//   handler: handlerFunction,
//   // other options
// });
// app.get(url, [options], handlerFunction); // [3]

// function business(request, reply) {
//   // `this` is the Fastify application instance
//   reply.send({ helloFrom: this.server.address() });
// }
// function business(request, reply) {
//   return { helloFrom: this.server.address() };
// }
async function business(request, reply) {
  return { helloFrom: this.server.address() };
}
app.get('/server', business);

// https://www.youtube.com/watch?v=OT-JkqdhODU&t=264s
// https://fastify.dev/docs/latest/Reference/TypeScript/#using-generics

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

interface IReply {
  code: number;
  message: string;
  body: any;
}

app.get<{
  Querystring: IQuerystring;
  Headers: IHeaders;
  Reply: IReply;
}>('/auth', async (request, reply) => {
  const { username, password } = request.query;
  // const customerHeader = request.headers['h-Custom'];
  // ;[return has detection...]; return `logged in!`;
  // return reply.send(vv);
  return {
    code: 200,
    message: 'success with ts',
    body: {
      username,
      password,
    },
  };
});

// class Car {
//   constructor(model) {
//     this.model = model;
//   }
//   toJSON() {
//     return {
//       type: 'car',
//       model: this.model,
//     };
//   }
// }
// app.get('/car', function (request, reply) {
//   return new Car('Ferrari');
// });

app.register(
  async function myPlugin(fastify, options) {
    console.log(options.myplugin.first);
  },
  {
    prefix: 'v1',
    myplugin: {
      first: 'custom option',
    },
  }
);

app.decorate('users', [
  {
    name: 'Sam',
    age: 23,
  },
  {
    name: 'Daphne',
    age: 21,
  },
]);

// []
// const BlogRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
// <>
// https://daily.dev/blog/how-to-build-blazing-fast-apis-with-fastify-and-typescript

// []
// declare module 'fastify' {
//   export interface FastifyInstance<
//     HttpServer = Server,
//     HttpRequest = IncomingMessage,
//     HttpResponse = ServerResponse,
//   > {
//     port: number;
//   }
// }
// <>
// https://github.com/fastify/fastify/issues/1417

const usersRouter: fastify.FastifyPluginAsync = async function (fastify: fastify.FastifyInstance, options: fastify.FastifyPluginOptions) {
  fastify.register(
    async function routes(child, _options) {
      child.get('/', async (_request, reply) => {
        reply.send(child.users);
      });

      child.post('/', async (request, reply) => {
        const newUser = request.body as { name: string; age: number };
        child.users.push(newUser);
        reply.send(newUser);
      });
    },
    { prefix: 'users' } // [3]
  );
};

app.register(usersRouter, { prefix: 'v1' }); // [2]

// ######## ^^^^^ test-learn
// ######## ^^^^^ test-learn
// ######## ^^^^^ test-learn
// ######## ^^^^^ test-learn

const ip_cors = 'http://localhost:3000'; // '127.0.0.1'; // dk port em // cannot use num, need localhost // TODO // @messy CROS .... design meaning .. n k dk

// ;del; fastify.RouteGenericInterface
// @todo fastify json conversion need_know ... & type safe pb
app.post<{
  Body: CodeConversionInputMsg;
  Reply: CodeConversionOutputMsg;
}>('/v1/remove_Comment_inGiven_FileCode', async (request, reply) => {
  const fileCode = request.body.codeInput;
  console.log('>> remove_Comment_inGiven_FileCode ' + fileCode.substring(0, 250).replaceAll(/\r\n|\r|\n/g, '\\n'));
  const fileCode_CommentRemoved = CommentRemoverJs.remove_Comment_inGiven_FileCode(fileCode);

  reply.headers({
    'Access-Control-Allow-Origin': ip_cors,
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  // return fileCode_CommentRemoved;
  return {
    codeOutput: fileCode_CommentRemoved,
  };
});

app.options<{
  Body: string;
  Reply: string;
}>('/v1/remove_Comment_inGiven_FileCode', async (request, reply) => {
  reply.headers({
    'Access-Control-Allow-Origin': ip_cors,
    'Access-Control-Allow-Headers': 'Content-Type',
    // 'really-getthis-2222': 'BBBDDD',
    // @dk: cors has no pb... just that server 500 & guess cannot send back 'Access-Control-Allow-Origin' & chrome though cors is not enabled ... 
  });
  return 'before was all fine..... now, but why nextjs can call without this, but vite requires';
})

app.ready().then(() => {
  app.log.info('All plugins are now registered!');
});

app
  .listen({
    port: 14080,
    host: '0.0.0.0',
  })
  .then((address) => {
    console.log(`Server is now listening on ${address}`);
  });

// ;related;  []
// ;related;      "start": "fastify start server.js"
// ;related;  <>
// ;related;  https://fastify.dev/docs/latest/Guides/Getting-Started/#run-your-server-from-cli
// ;related;
// ;related;  // AvvioError [Error]: Plugin must be a function or a promise. Received: 'object'
// ;related;
// ;related;  []
// ;related;  And create your server file(s):
// ;related;
// ;related;  // server.js
// ;related;  'use strict'
// ;related;
// ;related;  module.exports = async function (fastify, opts) {
// ;related;    fastify.get('/', async (request, reply) => {
// ;related;      return { hello: 'world' }
// ;related;    })
// ;related;  }
// ;related;  <>
// ;related;  https://fastify.dev/docs/latest/Guides/Getting-Started/#extend-your-server
// ;related;
// ;related;
// ;related;  []
// ;related;  // Run the server!
// ;related;  fastify.listen({ port: 3000 }, function (err, address) {
// ;related;  <>
// ;related;  https://fastify.dev/docs/latest/Guides/Getting-Started/#run-your-server-from-cli
// ;related;
// ;related;  ~~~// ... dk which way . unclear doc
