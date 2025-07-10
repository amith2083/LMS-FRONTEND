
export interface Lesson {
  _id: string;
  title: string;
  description: string;
  access: "free" | "private";
  videoKey?: string;
  duration?: number;
  active: boolean;
   slug?: string;

}
