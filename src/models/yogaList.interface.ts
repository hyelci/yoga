export interface YogaBlog {
  id: number;
  title: string;
  details: string;
  youtubeId: string;
}

export interface CreateYogaRequest {
  title: string;
  details: string;
  youtubeId: string;
}

export interface FilterRequest {
  query: string;
  order: string;
}
