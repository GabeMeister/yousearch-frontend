export type Video = {
  id: number;
  channel_id: number;
  channel_title: string;
  title: string;
  url: string;
  captions: string;
  upload_datetime: string;
  views: string;
  length: string;
  thumbnail: string;
  youtube_id: string;
};

export type CaptionSearchResults = {
  success: boolean;
  videos: Array<VideoCaptionsResult>;
};

export type VideoCaptionsResult = {
  video: Video;
  captions: Array<CaptionTextSnippet>;
};

export type CaptionTextSnippet = {
  url: string;
  caption_text: string;
  start: number;
};
