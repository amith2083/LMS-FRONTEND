import { Category } from "@/features/categories/types/category";
import { CourseModule } from "@/features/modules/types/module";
import { Testimonial } from "@/features/testimonials/types/testimonial";

export interface Instructor {
  _id: string;
  name: string;
  profilePicture?: string;
  designation?: string;
  bio?: string;
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
  quizSet?: any;

  createdAt: string;
  updatedAt: string;
}

