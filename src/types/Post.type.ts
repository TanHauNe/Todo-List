export interface IPost {
  _id?: string;
  title: string;
  desc: string;
  status?: number;
  user_id?: string;
}

export interface ICreatePost {
  accessToken: string;
  userId: string;
}
