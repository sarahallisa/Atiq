import {User} from "./User";

export interface Message {
  sender: User

  message: string

  createdAt: Date
}
