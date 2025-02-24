export type InternalUserState =
  | {
      user: User;
      status: "complete";
    }
  | {
      user: null;
      status: "complete" | "loading";
    };

export type User = {
  data: UserData;
  metadata: UserMetadata;
};

export type UserData = {
  name: string;
  username: string;
  profileImageURL: string;
};

export type UserMetadata = {
  completedAddProfileImageScreen: boolean;
};

export type UserUtilities = {
  initialiseUser: (user: User) => Promise<void>;
  updateUser: ({
    data,
    metadata
  }: {
    data?: Partial<UserData>;
    metadata?: Partial<UserMetadata>;
  }) => Promise<void>;
};
