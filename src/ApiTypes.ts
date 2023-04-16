export type Video = {
  id: number;
  channel_id: number;
  channel_title: string;
  title: string;
  url: string;
  captions: string;
  views: string;
  length: string;
  thumbnail: string;
  youtube_id: string;
};

export type CaptionTextSnippet = {
  title: string;
  thumbnail: string;
  channel_title: string;
  url: string;
  caption_text: string;
  start: number;
};
