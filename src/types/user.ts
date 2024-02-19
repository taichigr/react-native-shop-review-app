import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export const initialUser: User = {
  name: "",
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};
