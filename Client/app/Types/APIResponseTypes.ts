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

export interface UserSearchResultsResponse {
  data: {
    matchedUsers: Pick<
      CreateNewUserResponse["data"]["createdAccount"],
      "_id" | "name" | "username" | "profileImageURL"
    >[];
  };
}

export type GetUserInfo = Omit<
  CreateNewUserResponse["data"]["createdAccount"],
  "password" | "_id" | "followers" | "following" | "email"
>;
