export type VerificationTarget = "PHONE" | "EMAIL";

export type rideStatus =
  | "ACCEPTED" // waiting
  | "FINISHED"
  | "CANCELED"
  | "REQUESTING"
  | "ONROUTE";
