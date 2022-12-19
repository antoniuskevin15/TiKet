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
