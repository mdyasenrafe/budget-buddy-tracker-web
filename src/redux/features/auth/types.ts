export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive" | "pending" | "deleted";
  profile: string;
  __v: number;
};

export type TAuthState = {
  user: TUser | null;
  token: string | null;
};

export type TSigninPayload = {
  email: string;
  password: string;
};

export type TSignupPayload = {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "pending" | "deleted";
  profile: string;
};
