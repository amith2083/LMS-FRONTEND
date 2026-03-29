"use client";
import { CircleDollarSign, ListChecks } from "lucide-react";
import { CourseActions } from "@/features/courses/components/course-action";
import { TitleForm } from "@/features/courses/components/course-title-form";
import { SubTitleForm } from "@/features/courses/components/course-subtitle-form";
import { DescriptionForm } from "@/features/courses/components/course-description-form";
import { ImageForm } from "@/features/courses/components/course-image-form";
import { ModulesForm } from "@/features/modules/components/module-form";
import { PriceForm } from "@/features/courses/components/course-price-form";
import AlertBanner from "@/components/shared/alert-banner";
import { IconBadge } from "@/components/ui/icon-badge";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useParams } from "next/navigation";
import { useCourseById } from "@/features/courses/hooks/useCourseQueries";
import { useCategories } from "@/features/categories/hooks/useCategoryQueries";
import { useQuizsets } from "@/features/quizzes/hooks/useQuizQueries";
import { QuizSetForm } from "@/features/quizzes/components/quiz-form";

const EditCourse = () => {
  const params = useParams();
  const courseId = params?.courseId as string;

  const { data: course, isLoading: isLoadingCourse } = useCourseById(courseId);
  const { data: categories = [], isLoading: isLoadingCategories } =useCategories();
  const { data: quizSets= [] } =useQuizsets();
 

  

  if (isLoadingCourse) return <p className="p-6">Loading...</p>;
  if (!course) return <p className="p-6 text-red-500">Course not found.</p>;
  const mappedCategories = categories?.map((c) => {
    return {
      value: c.title,
      label: c.title,
      id: c._id,
    };
  });
 

  const modules = (course?.modules).sort((a, b) => a.order - b.order) || [];
  

  let mappedQuizSet = [];
  if (quizSets && quizSets.length > 0) {
    mappedQuizSet = quizSets.map((quizSet) => {
      return {
        value: quizSet.title,
        label: quizSet.title,
        id:quizSet._id
      };
    });
  }
  return (
    <>
      {!course?.status && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}
      <div className="p-6" >
        <div className="flex items-center justify-end">
          <CourseActions courseId={courseId} status={course?.status} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{ title: course?.title }}
              courseId={courseId}
            />
            <SubTitleForm
              initialData={{ subtitle: course?.subtitle }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={courseId}
            />
            <ImageForm
              imageUrl={
                course?.thumbnail
              }
              courseId={courseId}
            />
            <CategoryForm
              title={ course?.category?.title }
              courseId={courseId}
              options={mappedCategories}
            />

            <QuizSetForm
              title={ course?.quizSet?.title }
              courseId={courseId}
              options={mappedQuizSet}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>
              <ModulesForm initialData={modules} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm
                initialData={{ price: course?.price }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;


