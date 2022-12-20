export type Package = {
  created_at: string;
  expedition: string;
  id: number;
  isTaken: number;
  photoPath: string;
  receiptNumber: string;
  status: "ongoing" | "finished" | "unknown";
  sender: string;
  updated_id: string;
  user_id: number;
  updated_at: string;
};

export type Circle = {
  id: number;
  name: string;
  description: string;
  address: string;
  owner_id: string;
  photoURL: string;
  owner: User;
  users: User[];
};

export type User = {
  id: number;
  name: string;
  telephone: string;
  photoPath: string;
  admin: boolean;
  roomNumber: string;
  circle_id: string;
}

export type PackageContainer = {
  ongoing: Package[];
  finished: Package[];
  unknown: Package[];
};
