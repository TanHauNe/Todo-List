export interface IPost {
  _id?: string;
  title: string;
  desc: string;
  status: number;
  user_id?: string;
}

export interface ICreatePost {
  accessToken: string;
  userId: string;
}

export interface ISearchParams {
  key_search: string;
  page: number;
  limited: number;
}
