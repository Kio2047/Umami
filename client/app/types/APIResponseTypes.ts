export interface LoginUserResponse {
  data: {
    token: string;
    user: {
      data: {
        profileImageURL: string;
        name: string;
        username: string;
      };
      metadata: {
        completedAddProfileImageScreen: boolean;
      };
    };
  };
}

export interface RegisterUserResponse {
  data: {
    token: string;
    user: {
      data: {
        profileImageURL: string;
        name: string;
        username: string;
      };
      metadata: {
        completedAddProfileImageScreen: boolean;
      };
    };
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
