"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle2, Trophy, ClipboardCheck } from "lucide-react";
import Image from "next/image";
import { useCategoryById } from "@/app/hooks/useCategoryQueries";
import { useReport } from "@/app/hooks/useReportQueries";

const EnrolledCourseCard = ({ enrollment }) => {
  console.log("resss", enrollment);

  const { data: courseCategory, isLoading: isLoadingCategory } =
    useCategoryById(enrollment?.course?.category);
  const { data: courseReport, isLoading: isLoadingReport } = useReport(
    enrollment?.course?._id,
  );
  console.log("coursereport", courseReport);

  const totalCompletedModules =
    courseReport?.totalCompletedModules?.length || 0;
  const totalCompletedLessons =
    courseReport?.totalCompletedLessons?.length || 0;

  const quizzesTaken = courseReport?.quizAssessment;
  const totalMarks = courseReport?.quizAssessment?.assessments?.totalScore ?? 0;

  const hasTakenQuiz = !!courseReport?.quizAssessment;
  const quizTakenText = hasTakenQuiz ? "Yes" : "No";
  const quizTotalMarks = courseReport?.quizAssessment?.totalScore ?? 0;
  const actualMarks = courseReport?.quizAssessment?.actualMark ?? 0;

  const scorePercent =
    quizTotalMarks > 0 ? Math.round((actualMarks / quizTotalMarks) * 100) : 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Thumbnail with gradient overlay */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={enrollment?.course?.thumbnail}
          alt={enrollment?.course?.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

        {/* Category badge on image */}
        {courseCategory?.title && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {courseCategory.title}
          </span>
        )}

        {/* Modules count pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
          <BookOpen className="w-3 h-3" />
          <span>{enrollment?.course?.modules?.length} Modules</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">
          {enrollment?.course?.title}
        </h3>

        {/* Progress stats row */}
        <div className="grid grid-cols-2 gap-2">
          <StatPill
            icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            label="Lessons"
            value={totalCompletedLessons}
            color="emerald"
          />
          <StatPill
            icon={<BookOpen className="w-3.5 h-3.5 text-indigo-500" />}
            label="Modules"
            value={totalCompletedModules}
            color="indigo"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-slate-100" />

        {/* Quiz section */}
        <div className="space-y-2.5">
          {/* Quiz taken row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Quiz Taken</span>
            </div>
            <Badge
              variant={hasTakenQuiz ? "success" : "secondary"}
              className="text-[10px] px-2 py-0.5 rounded-full"
            >
              {isLoadingReport ? "..." : quizTakenText}
            </Badge>
          </div>

          {/* Score display */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Score</span>
              <span className="text-slate-800 font-bold tabular-nums">
                {isLoadingReport ? "..." : `${actualMarks} / ${quizTotalMarks}`}
              </span>
            </div>

            {/* Score bar */}
            <div className="relative w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: isLoadingReport ? "0%" : `${scorePercent}%`,
                  background:
                    scorePercent >= 70
                      ? "linear-gradient(90deg, #10b981, #34d399)"
                      : scorePercent >= 40
                        ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                        : "linear-gradient(90deg, #ef4444, #f87171)",
                }}
              />
            </div>

            {/* Score trophy row */}
            <div className="flex items-center gap-1 justify-end">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-semibold text-slate-500 tabular-nums">
                {isLoadingReport ? "..." : `${scorePercent}%`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small internal helper component
const StatPill = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "emerald" | "indigo";
}) => {
  const bg = color === "emerald" ? "bg-emerald-50" : "bg-indigo-50";
  const border = color === "emerald" ? "border-emerald-100" : "border-indigo-100";
  const text = color === "emerald" ? "text-emerald-700" : "text-indigo-700";

  return (
    <div className={`flex items-center gap-2 rounded-lg px-2.5 py-2 border ${bg} ${border}`}>
      {icon}
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</span>
        <span className={`text-sm font-bold tabular-nums ${text}`}>{value}</span>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;