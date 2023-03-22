export interface LoginUserResponse {
  token: string;
}

export interface CreateNewUserResponse {
  createdAccount: {
    email: string;
    name: string;
    username: string;
    profilePictureURL: string;
    following: string[];
    followers: string[];
    _id: string;
    __v: number;
    password: string;
  };
  token: string;
}

export interface GetURLSignatureResponse {
  signature: string;
  timestamp: number;
}

export interface CloudinaryImageUploadResponse {
  asset_id: string;
  secure_url: string;
  resource_type: "image";
}
