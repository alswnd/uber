export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(name: String): SayHelloResponse!\n  user: User\n}\n\n# these types must be known by typescript.\ntype SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n\ntype User {\n  # ! means required\n  id: Int!\n  email: String\n  veifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  age: Int\n  password: String\n  phoneNumber: String\n  veifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  createdAt: String\n  updatedAt: String\n  isDriving: Boolean!\n  isRiding: Boolean!\n  isTaken: Boolean!\n  lastLng: Float\n  lastLat: Float\n  lastOrientation: Float\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  used: Boolean!\n  createdAt: String!\n  updatedAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: SayHelloResponse;
  user: User | null; // | null was added automatically with "yarn run types" on "predev" in package.json
}

export interface SayHelloQueryArgs {
  name: string | null;
}

export interface SayHelloResponse {
  text: string;
  error: boolean;
}

export interface User {
  id: number;
  email: string | null;
  veifiedEmail: boolean;
  firstName: string;
  lastName: string;
  fullName: string | null;
  age: number | null;
  password: string | null;
  phoneNumber: string | null;
  veifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  isDriving: boolean;
  isRiding: boolean;
  isTaken: boolean;
  lastLng: number | null;
  lastLat: number | null;
  lastOrientation: number | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  used: boolean;
  createdAt: string;
  updatedAt: string;
}
