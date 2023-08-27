import fastify from 'fastify';
// import * as http from 'http';

declare module 'fastify' {
  export interface FastifyInstance {
    // export interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> {
    // port: number;
    users: { name: string; age: number }[];
  }
  // export interface FastifyPluginOptions {
  //   myplugin: string;
  // }
}
