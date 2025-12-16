"use client";
import Element from "@/components/element";
import { Marquee } from "@/components/magicui/marquee";
import { SectionTitle } from "@/components/section-title";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice"; 
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRightIcon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useCategories } from "@/app/hooks/useCategoryQueries";
import { useCourses } from "@/app/hooks/useCourseQueries";
import ChatBot from "./chatBot";
import { Course } from "@/app/types/course";
import { useRouter } from "next/navigation";

const HomePage = () => {
  
  const { data: categories = [],isLoading: catLoading, isFetching: catFetching } = useCategories();
  const router = useRouter();
  
  const { data: coursesData } = useCourses({
    page: 1,
    limit: 8,
    sort: "newest",
  });
 
  const courses:Course[] = coursesData?.courses ?? [];

  return (
    <>
      {/* Hero Section - No changes, static */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-16 mt-12 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center relative isolate rounded-2xl bg-muted/50 p-8 shadow-xl">
          <BorderBeam className="absolute inset-0" duration={5} size={200} />
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20 shadow-lg animate-pulse">
            Hey, Welcome
          </span>
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Learn By Doing with <br /> SkillSeed
          </h1>
          <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-9">
            “You don’t understand anything until you learn it more than one
            way.”
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              href="/courses"
              className={cn(
                buttonVariants({
                  size: "lg",
                  className:
                    "bg-primary hover:bg-primary/90 transition-all duration-300",
                })
              )}
            >
              Explore Now
            </Link>
            <Link
              href="/instructor/register"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className:
                    "border-primary/20 text-primary hover:bg-primary/10",
                })
              )}
            >
              Become An Instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee - Static */}
      <Marquee
        pauseOnHover
        className="bg-gradient-to-r from-primary/10 to-purple-100 text-primary py-3 px-6 rounded-xl max-w-7xl mx-auto shadow-sm"
      >
        <span className="text-sm md:text-lg font-semibold tracking-wide">
          🎉 New Courses Weekly | Become an Instructor Today | Lifetime Access |
          Learn by Doing 🚀
        </span>
      </Marquee>

      <Element />

      {/* Categories Section with Carousel */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-16">
  <div className="flex items-center justify-between">
    <SectionTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
      Categories
    </SectionTitle>
  </div>

  <Carousel
    opts={{
      align: "start",
      loop: true,
    }}
    className="w-full"
  >
    <CarouselContent className="px-8">
      {categories.map((category: any) => (
        <CarouselItem
          key={category._id}
          className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 mx-4"
        >
          <div
            onClick={() => router.push(`/courses?category=${category.title}`)}
            className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-background to-muted/50 p-3 hover:scale-105 transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl group cursor-pointer"
          >
            <div className="flex flex-col gap-4 items-center justify-between rounded-md p-6">
              <Image
                src={
                  category.thumbnail ||
                  "/assets/images/categories/default.jpg"
                }
                alt={category.title}
                width={120}
                height={120}
                className="object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors text-center">
                {category.title}
              </h3>
            </div>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>

    {/* Navigation Buttons */}
    <CarouselPrevious className="left-0" />
    <CarouselNext className="right-0" />
  </Carousel>
</section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-16">
        <div className="flex items-center justify-between">
          <SectionTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Featured
          </SectionTitle>
          <Link
            href="/courses"
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-2 transition-colors"
          >
            Browse All <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
          {courses.map((course: any) => (
            <Link key={course._id} href={`/courses/${course._id}`}>
              <div className="group hover:shadow-lg transition-all duration-300 overflow-hidden border rounded-xl p-4 h-full bg-background hover:bg-muted/50">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={
                      course.thumbnail || "/assets/images/courses/default.png"
                    }
                    alt={course.title}
                    className="object-contain group-hover:scale-115 transition-transform duration-300 "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <BorderBeam className="opacity-50" />
                </div>
                <div className="flex flex-col pt-4">
                  <div className="text-lg md:text-base font-semibold group-hover:text-primary line-clamp-2 transition-colors">
                    {course.title}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.category?.title || "Uncategorized"}
                  </p>
                  <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs text-slate-600">
                    <div className="flex items-center gap-x-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{course.modules?.length || 0} Modules</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-md md:text-sm font-medium text-foreground">
                      {formatPrice(course.price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
            <ChatBot />
        </div>
      </section>
    </>
  );
};

export default HomePage;
