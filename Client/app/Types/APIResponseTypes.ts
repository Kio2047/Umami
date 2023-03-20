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
