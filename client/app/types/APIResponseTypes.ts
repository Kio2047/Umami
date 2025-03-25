// TODO: define top level zod schemas to enforce consistency between client and api

import { Post } from "./OtherTypes";

type ApiResponse<BodyData extends Record<string, any> = never> = {
  status: "success" | "error";
  message: string;
  data: BodyData;
};

export type LoginUserResponse = ApiResponse<{
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
}>;

export type RegisterUserResponse = ApiResponse<{
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
}>;

export type GetFeedPostsResponse = ApiResponse<{
  posts: Post[];
  lastCreatedAt: string | undefined;
}>;

export type GetUploadSignatureResponse = ApiResponse<{
  signature: string;
  timestamp: number;
}>;

export type CloudinaryImageUploadResponse = ApiResponse<{
  asset_id: string;
  secure_url: string;
  resource_type: "image";
}>;

export type UpdateUserResponse = ApiResponse;

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
