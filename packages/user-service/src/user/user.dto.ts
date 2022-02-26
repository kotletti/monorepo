export namespace UserDTO {
  export type CreateRequest = {
    firstName: string;
    lastName: string;
  };

  export type CreatePayload = {
    clientId: string;
    profile: {
      firstName: string;
      lastName: string;
    };
  };

  // export type CreateResponse {}
}
