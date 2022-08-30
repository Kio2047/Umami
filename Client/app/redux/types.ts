import { useAppSelector } from "./hooks"
import { selectIsAuthenticated } from "./slices/isAuthenticatedSlice"

// shouldn't work as you're not in a component inside of the provider

type UserInfo = {} | {
  profilePictureURL: string,
  friends: ,
  settings:
}