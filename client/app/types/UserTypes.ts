export type UserState =
  | {
      user: User;
      status: "complete";
    }
  | {
      user: null;
      status: "complete" | "loading";
    };

export interface User {
  data: UserData;
  metadata: UserMetadata;
}

interface UserData {
  name: string;
  username: string;
  profileImageURL: string;
}

interface UserMetadata {
  completedAddProfileImageScreen: boolean;
}
