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
import { useCoursesForAdmin, useRefreshEmbeddings } from '@/app/hooks/useCourseQueries';
import { useEnrollments } from '@/app/hooks/useEnrollmentQueries';
import { useCategories } from '@/app/hooks/useCategoryQueries';
import { useTotalEarningsForAdmin } from '@/app/hooks/usePayout';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

// Vibrant color palette for each category bar
const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e',
];

const DashboardPage = () => {
  const { data: courses = [], isLoading: loadingCourses } = useCoursesForAdmin();
  const { data: allEnrollments = [], isLoading: loadingEnrollments } = useEnrollments();
  const { data: allCategories = [], isLoading: loadingCategories } = useCategories();
  const { data: totalEarnings = [], isLoading: loadingEarnings } = useTotalEarningsForAdmin();
const {
    mutate: refreshEmbeddings,
    isPending: isRefreshing,
    isSuccess,
    isError,
    data: refreshResult,
  } = useRefreshEmbeddings();

  // Calculate enrollments per category
  const enrollmentsByCategory = allCategories.map((category: any) => {
    const categoryCourses = courses.filter((course: any) => 
      course.category === category._id || course.category?._id === category._id
    );

    const categoryCourseIds = categoryCourses.map((c: any) => c._id);

    const categoryEnrollmentsCount = allEnrollments.filter((enrollment: any) =>
      categoryCourseIds.includes(enrollment.course) ||
      categoryCourseIds.includes(enrollment.course?._id)
    ).length;

    return {
      category: category.title || 'Uncategorized',
      enrollments: categoryEnrollmentsCount,
    };
  });

  // Sort by enrollments descending
  enrollmentsByCategory.sort((a: any, b: any) => b.enrollments - a.enrollments);

  // Filter out categories with 0 enrollments (optional, remove if you want all)
  const filteredChartData = enrollmentsByCategory.filter((item: any) => item.enrollments > 0);

  const isLoading = loadingCourses || loadingEnrollments || loadingCategories;
  const handleRefreshAI = () => {
    refreshEmbeddings(); 
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dashboard Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-3 mb-2 ">
         <Button
            variant="outline"
            onClick={handleRefreshAI}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            AI Refresh Data
          </Button>
          
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-amber-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length}</div>
            <p className="text-xs opacity-80 mt-1">Across all instructors</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allEnrollments.length}</div>
            <p className="text-xs opacity-80 mt-1">Platform-wide students</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalEarnings}</div>
            <p className="text-xs opacity-80 mt-1">Platform earnings </p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Colorful Chart: Enrollments by Category */}
      {filteredChartData.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Enrollments by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={filteredChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="enrollments" radius={[8, 8, 0, 0]} name="Enrollments">
                  {filteredChartData.map((entry, index) => (
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