export interface Lesson {
  _id: string;
  title: string;
  description: string;
  access: "public" | "private" | "free";
  videoKey?: string;
  duration?: number;
  active: boolean;
  slug?: string;
  order: number;
  moduleId: string;
  state?: "started" | "completed";
}
