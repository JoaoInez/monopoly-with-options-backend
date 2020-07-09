export type Icon =
  | "hat"
  | "ship"
  | "horse"
  | "car"
  | "shoe"
  | "cannon"
  | "cart"
  | "dog";

export type Player = {
  icon: Icon;
  name: string;
  banker: boolean;
  money: number;
};

export type OtherPlayer = {
  id: any;
  icon: Icon;
  name: string;
  banker: boolean;
};
