export interface LoginUserResponse {
  data: {
    userID: string;
    token: string;
  };
}

export interface CreateNewUserResponse {
  data: {
    createdAccount: {
      email: string;
      name: string;
      username: string;
      profileImageURL: string;
      following: string[];
      followers: string[];
      _id: string;
      __v: number;
      password: string;
    };
    token: string;
  };
}

export interface GetURLSignatureResponse {
  data: {
    signature: string;
    timestamp: number;
  };
}

export interface CloudinaryImageUploadResponse {
  asset_id: string;
  secure_url: string;
  resource_type: "image";
}

export type GetUserInfoResponse = Omit<
  CreateNewUserResponse["createdAccount"],
  "password" | "__v" | "_id"
>;
