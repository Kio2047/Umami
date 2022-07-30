export type UserCredentials = {
  email: string,
  password: string
}

export type User = {
  email: string,
  password: string,
  name: string,
  profilePictureURL: string,
  posts: [string],
  friends: [string]
}