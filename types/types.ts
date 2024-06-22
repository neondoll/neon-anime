export interface AddedAnimeItem {
  name: AnimeItem['name'];
  episodes: AnimeItem['episodes'];
  date_release: AnimeItem['date_release'];
  date_finish: AnimeItem['date_finish'];
}

export interface AnimeItem {
  id: number;
  name: string;
  episodes?: number;
  date_release?: string;
  date_finish?: string;
}

export interface AnimeStatus {
  id: number;
  value: string;
  color?: string;
}

export interface AnimeUserStatus {
  anime_id: AnimeItem['id'];
  status_id: AnimeStatus['id'];
}

export interface Credentials {
  email: string;
  password: string;
}
