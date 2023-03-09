import {User} from "./User";

export interface ChatRoom {
  id: string;

  buyer: User;

  seller: User;
}
