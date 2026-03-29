
export interface TestimonialUser {
  name: string;
  profilePicture: string;
}
export interface Testimonial {
  _id: string;
  user: TestimonialUser;
  content: string;
  comment?: string;
  review?: string;
  rating: number;
}

