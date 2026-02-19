import { Lesson } from "./lesson";

export interface CourseModule {
  _id: string;
  title: string;
  description: string;
  slug: string;
  order: number;
  status: boolean;
  courseId: string;
  lessonIds: Lesson[];
  createdAt: string;
  updatedAt: string;
}
