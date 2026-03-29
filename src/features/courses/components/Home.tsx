'use client'
import { useState, useEffect } from "react";
import Element from "@/components/shared/element";
import { Marquee } from "@/components/magicui/marquee";
import { SectionTitle } from "@/components/shared/section-title";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRightIcon, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Course } from "@/features/courses/types/course";
import { Category } from "@/features/categories/types/category";
import { useUser } from "@/features/auth/context/UserContext";



interface HomePageClientProps {
  categories: Category[];
  courses: Course[];
}

const ITEMS_PER_PAGE = 4;

const MobileCategoryScroll = ({ categories }: { categories: Category[] }) => {

  const [startIndex, setStartIndex] = useState(0);

  const visibleCategories = categories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + ITEMS_PER_PAGE < categories.length;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Up Arrow */}
      <button
        onClick={() => setStartIndex((prev) => Math.max(0, prev - ITEMS_PER_PAGE))}
        disabled={!canGoUp}
        className="flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-5 h-5 text-primary" />
      </button>

      {/* Category Cards */}
      <div className="flex flex-col gap-3 w-full">
        {visibleCategories.map((category) => (
          <Link
            key={category._id}
            href={`/courses?category=${encodeURIComponent(category.title)}`}
            className="block"
          >
            <div className="flex items-center gap-4 rounded-xl border bg-gradient-to-br from-background to-muted/50 p-3 shadow hover:shadow-md hover:bg-muted/70 transition-all duration-300 group">
              <Image
                src={category.thumbnail || "/assets/images/categories/default.jpg"}
                alt={category.title}
                width={60}
                height={60}
                className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
              />
              <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Down Arrow */}
      <button
        onClick={() =>
          setStartIndex((prev) =>
            Math.min(categories.length - ITEMS_PER_PAGE, prev + ITEMS_PER_PAGE)
          )
        }
        disabled={!canGoDown}
        className="flex items-center justify-center w-10 h-10 rounded-full border bg-background shadow hover:bg-muted transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};

const HomePageClient = ({ categories, courses }: HomePageClientProps) => {
  const { user, loading } = useUser();
  const isAuthenticated = !!user;

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "TRANSFORM YOUR CAREER PATH",
      title: <>Build Skills That<br /><span className="text-secondary italic">Build Your Future.</span></>,
      desc: "Knowledge is only potential power. Execution is the actual power. Master in-demand tech with project-led courses crafted for elite results.",
      cta: "START LEARNING NOW",
      secondaryCta: "EXPLORE OUR STORY",
      overlay: <div className="absolute top-20 right-[10%] w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse" />
    },
    {
      badge: "LEARN FROM THE ELITE",
      title: <>Industry Experts<br /><span className="text-secondary italic">Your New Mentors.</span></>,
      desc: "Get direct access to senior developers and designers from top tech firms. Learn the secrets, shortcuts, and industry standards that books don't teach.",
      cta: "MEET INSTRUCTORS",
      secondaryCta: "BROWSE CATALOG",
      overlay: <div className="absolute top-40 left-[15%] w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700" />
    },
    {
      badge: "PROJECT-FIRST PHILOSOPHY",
      title: <>Master Practical<br /><span className="text-secondary italic">Real-World Skills.</span></>,
      desc: "Ditch the theory loop. Every course centered around building production-grade applications that look great on your portfolio and impressed recruiters.",
      cta: "VIEW PROJECTS",
      secondaryCta: "SEE REVIEWS",
      overlay: <div className="absolute bottom-40 right-[15%] w-56 h-56 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-500" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section - Multi-Slide with MagicUI */}
      <section className="relative w-full min-h-[600px] lg:min-h-[820px] overflow-x-hidden bg-[#0F4C5C]">
        {/* Background Animation Overlays */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0F4C5C] via-[#1A535C] to-[#2E8B90] mix-blend-multiply" />
        <div className="absolute inset-0 w-full h-full bg-[url('/assets/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* Carousel Content Area */}
        <div className="relative w-full h-full flex items-center justify-center py-20 lg:py-32">
          {heroSlides.map((slide, idx) => (
            currentSlide === idx && (
              <div
                key={idx}
                className="w-full relative z-10 max-w-7xl mx-auto px-6 sm:px-10 flex flex-col items-center text-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/20 text-accent font-bold text-sm tracking-widest uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  {slide.badge}
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] md:leading-[1.05] tracking-tight max-w-6xl">
                  {slide.title}
                </h1>

                <p className="max-w-3xl text-slate-200 text-base md:text-xl font-medium leading-relaxed opacity-90 px-4">
                  {slide.desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 w-full">
                  <Link
                    href="/courses"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        className: "w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-bold px-12 py-7 text-xl rounded-2xl shadow-[0_20px_50px_rgba(251,133,0,0.3)] transition-all hover:scale-105 active:scale-95",
                      })
                    )}
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/about"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                        className: "w-full sm:w-auto bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold px-12 py-7 text-xl rounded-2xl backdrop-blur-md transition-all active:scale-95",
                      })
                    )}
                  >
                    {slide.secondaryCta}
                  </Link>
                </div>
                {slide.overlay}
              </div>
            )
          ))}

          <div className="absolute bottom-20 left-[10%] w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Slide Indicators - Aesthetic Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "transition-all duration-500 rounded-full border border-white/20",
                currentSlide === idx ? "w-12 h-2 bg-accent shadow-[0_0_15px_rgba(251,133,0,0.5)] border-accent/40" : "w-2 h-2 bg-white/30 hover:bg-white/60"
              )}
            />
          ))}
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-40">
          <BorderBeam size={600} duration={20} className="from-accent via-secondary to-primary/50" />
        </div>
      </section>

      <Marquee
  pauseOnHover
  className="w-full md:max-w-7xl bg-primary/90 text-white py-4 px-4 md:px-6 mx-auto shadow-2xl relative mt-4 md:-mt-8 z-20 overflow-hidden rounded-xl "
>
        <span className="text-sm md:text-lg font-bold tracking-[0.2em] uppercase">
          🎉 Unleash Your Potential &bull; Master New Skills &bull; Industry Leading Certificates &bull; Learn from Experts 🚀
        </span>
      </Marquee>

      <div className="pt-10 md:pt-0">
        <Element />
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-24 overflow-hidden relative bg-background">
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px] opacity-40" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-accent rounded-full" />
              <span className="text-accent font-bold tracking-widest text-xs uppercase">Top Categories</span>
            </div>
            <SectionTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Popular Categories
            </SectionTitle>
          </div>
          <Link href="/courses" className="group text-sm font-bold text-accent flex items-center gap-2 hover:translate-x-1 transition-all bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100">
            VIEW ALL CATEGORIES <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile: Vertical list with a cleaner, premium design */}
        <div className="block md:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                href={`/courses?category=${encodeURIComponent(category.title)}`}
                className="group p-[1px] bg-gradient-to-br from-slate-200 to-white hover:from-primary/50 hover:to-purple-500/50 rounded-2xl transition-all duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 h-full">
                  <div className="relative size-16 shrink-0 rounded-xl overflow-hidden shadow-inner bg-slate-50">
                    <Image
                      src={category.thumbnail || "/assets/images/categories/default.jpg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Carousel with Premium Floating Cards */}
        <div className="hidden md:block">
          <Carousel opts={{ align: "start", loop: true }} className="w-full relative group/carousel">
            <CarouselContent className="-ml-4 pb-12 pt-4">
              {categories.map((category, idx) => {
                const gradients = [
                  'from-blue-50 to-indigo-50/30',
                  'from-purple-50 to-pink-50/30',
                  'from-emerald-50 to-teal-50/30',
                  'from-orange-50 to-rose-50/30',
                  'from-sky-50 to-blue-50/30'
                ];
                const borderGradients = [
                  'group-hover:border-blue-200',
                  'group-hover:border-purple-200',
                  'group-hover:border-emerald-200',
                  'group-hover:border-orange-200',
                  'group-hover:border-sky-200'
                ];

                return (
                  <CarouselItem
                    key={category._id}
                    className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
                  >
                    <Link
                      href={`/courses?category=${encodeURIComponent(category.title)}`}
                      className="block group h-full"
                    >
                      <div className={cn(
                        "h-full relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-gradient-to-br",
                        gradients[idx % gradients.length]
                      )}>
                        <div className={cn(
                          "absolute inset-0 border-2 border-transparent transition-colors duration-500 rounded-[2rem]",
                          borderGradients[idx % borderGradients.length]
                        )} />

                        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-white/40 blur-xl rounded-full scale-150 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative size-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg bg-white group-hover:rotate-6 transition-all duration-500">
                              <Image
                                src={category.thumbnail || "/assets/images/categories/default.jpg"}
                                alt={category.title}
                                fill
                                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-xl text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
                              {category.title}
                            </h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                              Explore Path
                            </p>
                          </div>
                        </div>

                        {/* Aesthetic Floating Blob inside card */}
                        <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Custom Navigation */}
            <div className="flex gap-2 absolute -top-16 right-0 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
              <CarouselPrevious className="static h-10 w-10 border-slate-200 hover:bg-white hover:text-primary hover:border-primary/30 transition-all rounded-xl" />
              <CarouselNext className="static h-10 w-10 border-slate-200 hover:bg-white hover:text-primary hover:border-primary/30 transition-all rounded-xl" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-24 bg-background">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-accent rounded-full" />
              <span className="text-accent font-bold tracking-widest text-xs uppercase">Trending Now</span>
            </div>
            <SectionTitle className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Featured Courses
            </SectionTitle>
          </div>
          <Link
            href="/courses"
            className="text-sm font-bold text-accent hover:text-accent/80 flex items-center gap-2 transition-all bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-100 group"
          >
            EXPLORE ALL COURSES <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Link key={course._id} href={`/courses/${course._id}`}>
              <div className="group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden border border-slate-100/50 rounded-2xl p-5 h-full bg-white relative">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5">
                  <Image
                    src={course.thumbnail || "/assets/images/courses/default.png"}
                    alt={course.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-[10px] font-bold rounded-lg shadow-sm">
                    {course.category?.title || "COURSES"}
                  </div>
                </div>
                <div className="flex flex-col h-[calc(100%-8.5rem)]">
                  <h4 className="text-lg font-bold text-slate-800 group-hover:text-accent line-clamp-2 transition-colors duration-300 leading-snug">
                    {course.title}
                  </h4>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span>{course.modules?.length || 0} Lessons</span>
                    </div>
                    <p className="text-lg font-extrabold text-primary">
                      {formatPrice(course.price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePageClient;


