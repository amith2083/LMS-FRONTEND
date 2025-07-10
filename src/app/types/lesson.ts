
export interface Lesson {
  _id: string;
  title: string;
  description: string;
  access: "free" | "private";
  video_url?: string;
  duration?: number;
  active: boolean;
   slug?: string;
}
