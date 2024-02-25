import { Timestamp } from "firebase/firestore";

type UserRef = {
  id: string;
  name: string;
};

type ShopRef = {
  id: string;
  name: string;
};
export type Review = {
  id?: string;
  text: string;
  score: number;
  user: UserRef;
  shop: ShopRef;
  updatedAt: Timestamp;
};
