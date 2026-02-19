
export interface TestimonialUser {
  name: string;
  profilePicture: string;
}
export interface Testimonial {
  _id: string;
  user: TestimonialUser;
  comment: string;
  rating: number;
}
