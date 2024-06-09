export interface AnimeItem {
  id: number;
  name: string;
  episodes?: number;
  date_release?: string;
  date_finish?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Sort {
  column: string;
  direction: "asc" | "desc";
}
