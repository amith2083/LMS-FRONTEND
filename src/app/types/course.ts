import { Category } from "./category";
import { CourseModule } from "./module";
import { Testimonial } from "./Testimonial";

export interface Instructor {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;

  category?: Category;

  instructor?: Instructor;  

  modules?: Module[];

  createdAt?: string;
  updatedAt?: string;
}

export interface CoursesResponse {
  courses: Course[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}


export interface RelatedCourse {
  _id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: Category;
}

export interface SingleCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  status: boolean;
  isApproved: boolean;

  category: Category;
  instructor: Instructor;

  modules: CourseModule[];
  learning: string[];
  testimonials: Testimonial[];

  createdAt: string;
  updatedAt: string;
}
