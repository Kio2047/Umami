// TODO: Move below types to appropriate new files

export type Post = {
  _id: string;
  author: {
    _id: string;
    username: string;
    profileImageURL: string;
  };
  restaurant: {
    _id: string;
    name: string;
  };
  scores: {
    food: number;
    atmosphere: number;
    service: number;
  };
  imageURLs: string[];
  createdAt: Date;
  title: string;
  text: string;
  others: {
    _id: string;
    username: string;
    profileImageURL: string;
  }[];
};

export type CompleteUserDocument = {
  _id: string;
  email: string;
  // passwordHash: string;
  name: string;
  username: string;
  profileImageURL: string;
  // TODO: consider using virtuals and an intermediary collection for many-many following / followers relationship
  following: string[];
  followers: string[];
};

export type NewPost = {
  authorID: string;
  restaurant: string;
  imageURLs: string[];
  ratings: number[];
  title: string;
  text: string;
  others: string[];
  timestamp: Date | undefined;
};

export type formTextFields = "restaurantName" | "title" | "text";
export type formRatingFields = "food" | "vibes" | "value";
