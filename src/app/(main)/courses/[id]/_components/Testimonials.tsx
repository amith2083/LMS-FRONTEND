import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { SectionTitle } from "@/components/section-title";
import StarRating from "@/components/star-rating";
import { Testimonial } from "@/app/types/Testimonial";
interface Props {
  testimonials: Testimonial[];
}
const Testimonials = ({ testimonials }:Props) => {
 
  return (
    <section className="pb-8 md:pb-12 lg:pb-24 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container">
        <SectionTitle className="mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
          Testimonials
        </SectionTitle>
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-2xl:w-[90%] w-full mx-auto"
        >
          <CarouselPrevious className="hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all duration-300" />
          <CarouselNext className="hover:bg-gradient-to-r hover:from-pink-600 hover:to-orange-600 hover:text-white hover:border-transparent transition-all duration-300" />
          <CarouselContent className="py-4">
            {testimonials.map((testimonial, index) => {
              const gradients = [
                'from-purple-500 to-pink-500',
                'from-pink-500 to-orange-500',
                'from-orange-500 to-red-500',
                'from-purple-600 to-purple-400',
                'from-pink-600 to-pink-400'
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <CarouselItem
                  key={testimonial._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="sm:break-inside-avoid h-full">
                    <blockquote className="relative h-full rounded-2xl bg-white p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 hover:scale-105 overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`}></div>
                      
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                          <Image
                            alt={`Profile ${testimonial?.user?.name}`}
                            src={testimonial?.user?.profilePicture}
                            width="56"
                            height="56"
                            className="relative size-14 rounded-full object-cover border-3 border-white ring-2 ring-purple-100"
                          />
                        </div>
                        <div>
                          <p className="mt-0.5 text-lg font-bold text-gray-900">
                            {testimonial?.user?.name}
                          </p>
                          <div className="flex justify-start gap-0.5">
                            <StarRating rating={testimonial?.rating} />
                          </div>
                        </div>
                      </div>
                      
                      <p className="mt-6 text-gray-600 leading-relaxed italic">
                        "{testimonial?.content}"
                      </p>
                      
                      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${gradient} opacity-5 rounded-tl-full`}></div>
                    </blockquote>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;