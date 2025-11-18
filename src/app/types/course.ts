
export interface Category {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  status: boolean;
  __v?: number;
}

export interface Instructor {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  password?: string;
}

export interface Module {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  slug: string;
  order?: number;
  lessonIds?: string[];
  course?: string;
  __v?: number;
}

export interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail?: string;
  price: number;
  status: boolean;
  isApproved: boolean;
  createdOn: string;
  modifiedOn: string;
  category?: Category;
  instructor?: Instructor;
  modules: Module[];
  quizSet?: string;
  learning?: string[];
  testimonials?: any[];
  __v?: number;
}

export interface CoursesResponse {
  courses: Course[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}