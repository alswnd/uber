export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello: String!\n}\n\n# these types must be known by typescript.\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: string;
}

export interface Greeting {
  text: string;
  error: boolean;
}
