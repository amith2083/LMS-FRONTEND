'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useCoursesByInstructorId } from '@/app/hooks/useCourseQueries';
import { useEnrollments } from '@/app/hooks/useEnrollmentQueries';
import { useTotalEarnings } from '@/app/hooks/usePayout';

// Define a vibrant color palette for the bars
const COLORS = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#f59e0b', // amber-500
  '#eab308', // yellow-500
  '#84cc16', // lime-500
  '#22c55e', // green-500
  '#10b981', // emerald-500
  '#14b8a6', // teal-500
  '#06b6d4', // cyan-500
  '#0ea5e9', // sky-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#a855f7', // purple-500
  '#d946ef', // fuchsia-500
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
];

const DashboardPage = () => {
  const { data: session } = useSession();
  const instructorId = session?.user?.id;

  const { data: courses = [], isLoading: loadingCourses } = useCoursesByInstructorId(instructorId);
  const { data: allEnrollments = [], isLoading: loadingEnrollments } = useEnrollments();
  const { data: totalEarnings = 0, isLoading: loadingEarnings } = useTotalEarnings(instructorId);

  // Get array of course IDs owned by this instructor
  const instructorCourseIds = courses.map((course: any) => course._id);

  // Filter enrollments that belong to instructor's courses
  const instructorEnrollments = allEnrollments.filter((enrollment: any) =>
    instructorCourseIds.includes(enrollment.course) ||
    instructorCourseIds.includes(enrollment.course?._id) // in case it's populated object
  );

  const totalEnrollments = instructorEnrollments.length;

  // DYNAMIC CHART DATA: Enrollments per course
  const chartData = courses.map((course: any) => {
    const courseEnrollmentsCount = allEnrollments.filter((enrollment: any) =>
      (enrollment.course === course._id) ||
      (enrollment.course?._id === course._id)
    ).length;

    return {
      course: course.title || 'Untitled Course', // Use course title for display
      enrollments: courseEnrollmentsCount,
    };
  });

  // Sort by enrollments descending (best performing first)
  chartData.sort((a, b) => b.enrollments - a.enrollments);

  if (loadingCourses || loadingEnrollments || loadingEarnings) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-amber-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length ?? 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalEnrollments ?? 0}</div>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalEarnings ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Chart: Enrollments per Course - Now Colorful! */}
      {chartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Enrollments by Course</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="course"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                  tick={{ fill: '#374151' }}
                />
             <YAxis
                       ticks={[0, 2, 4, 6, 8, 10]}  // Forced even ticks 
                       domain={[0, 10]}  // Fixed range up to 10
                       allowDecimals={false}  // No .0 decimals 
                       tick={{ fill: '#374151' }}
                     />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="enrollments" radius={[8, 8, 0, 0]} name="Enrollments">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-10 text-center text-gray-500">
            No enrollment data available yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;