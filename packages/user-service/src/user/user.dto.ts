export namespace UserDTO {
  export type CreateRequest = {
    firstName: string;
    lastName: string;
  };

  export type CreatePayload = {
    clientId: string;
    profile: string;
  };

  // export type CreateResponse {}
}

export namespace UserProfileDTO {
  export type CreatePayload = {
    firstName: string;
    lastName: string;
  };
}
