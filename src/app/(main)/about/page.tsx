
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  BookOpen,
  Users,
  Award,
  Star,
  Target,
  Heart,
  Globe,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Marquee } from "@/components/magicui/marquee";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Same style as Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-8 text-center relative isolate rounded-2xl bg-muted/50 p-12 shadow-xl">
          <BorderBeam className="absolute inset-0" duration={5} size={200} />

          <span className="rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary border border-primary/20 shadow-lg animate-pulse">
            About SkillSeed
          </span>

          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Don’t Just Learn
            <br />
            Actually Build
          </h1>

          <p className="max-w-[48rem] leading-relaxed text-muted-foreground text-lg sm:text-xl">
            We’re not just another learning platform. We’re a movement — helping
            thousands of students master real-world skills through hands-on
            projects, expert mentorship, and lifetime access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/courses"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-primary hover:bg-primary/90"
              )}
            >
              Explore Courses <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/instructor/register"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary/20 text-primary hover:bg-primary/10"
              )}
            >
              Teach on SkillSeed
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee - Same as Homepage */}
      <Marquee
        pauseOnHover
        className="bg-gradient-to-r from-primary/10 to-purple-100 text-primary py-3 px-6 rounded-xl max-w-7xl mx-auto shadow-sm my-8"
      >
        <span className="text-sm md:text-lg font-semibold tracking-wide">
          New Courses Weekly | Real Projects Only | Lifetime Access | Join
          50,000+ Learners
        </span>
      </Marquee>

      {/* Stats Section - Same card style as course cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle className="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-12">
          By the Numbers
        </SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: "50K+", label: "Active Students" },
            { icon: BookOpen, value: "300+", label: "Total Courses" },
            { icon: Award, value: "120+", label: "Expert Instructors" },
            { icon: Star, value: "4.9/5", label: "Average Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border bg-background p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <BorderBeam className="opacity-40" />
              <stat.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                To make high-quality, practical education accessible to everyone
                — no matter where you are or how much time you have. We believe
                the best way to learn is by <strong>doing</strong>, not just
                watching.
              </p>
              <div className="space-y-4">
                {[
                  "Project-based learning only",
                  "Lifetime access to all courses",
                  "Learn from industry experts",
                  "Build real portfolio projects",
                  "Active student community",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border">
              <Image
                src="/assets/images/about.jpg"
                alt="Students building projects"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNMQKo2YcC8e7vMASW1m1iFZrA9J7gKCGP//Z"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-2xl font-bold">Real Skills.</p>
                <p className="text-lg">Real Results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-12">
            What We Stand For
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Excellence",
                desc: "Only the best courses make it to our platform",
              },
              {
                icon: Heart,
                title: "Student First",
                desc: "Your success is our only goal",
              },
              {
                icon: Globe,
                title: "Accessible to All",
                desc: "Learn from anywhere, at your own pace",
              },
              {
                icon: Zap,
                title: "Fast & Practical",
                desc: "No fluff. Just skills that get you hired",
              },
              {
                icon: Shield,
                title: "Trusted Quality",
                desc: "Every course is reviewed and approved",
              },
              {
                icon: Sparkles,
                title: "Lifelong Learning",
                desc: "One purchase. Forever access.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="group relative overflow-hidden rounded-xl border bg-background p-8 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <BorderBeam className="opacity-30" />
                <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center bg-gradient-to-r from-primary/10 to-purple-100 rounded-2xl p-12 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already building their future
            with SkillSeed.
          </p>
          <Link
            href="/courses"
            className={cn(
              buttonVariants({ size: "lg" }),
              "text-lg px-10 bg-primary hover:bg-primary/90"
            )}
          >
            Browse All Courses <ArrowRightIcon className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
