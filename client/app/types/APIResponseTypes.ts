export interface LoginUserResponse {
  data: {
    userID: string;
    token: string;
  };
}

export interface CreatedAccount {
  _id: string;
  email: string;
  name: string;
  username: string;
  profileImageURL: string;
  following: string[];
  followers: string[];
  password: string;
}

export interface CreateNewUserResponse {
  data: {
    // createdAccount: CreatedAccount;
    token: string;
  };
}

export interface GetUploadSignatureResponse {
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

// export interface UserSearchResultsResponse {
//   data: {
//     matchedUsers: Pick<
//       CreateNewUserResponse["data"]["createdAccount"],
//       "_id" | "name" | "username" | "profileImageURL"
//     >[];
//   };
// }

// export type GetUserInfo = Omit<
//   CreateNewUserResponse["data"]["createdAccount"],
//   "password" | "_id" | "followers" | "following" | "email"
// >;
