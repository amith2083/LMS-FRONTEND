"use client";
import { CircleDollarSign, ListChecks } from "lucide-react";

import { CourseActions } from "./_components/course-action";
import { TitleForm } from "./_components/title";
import { SubTitleForm } from "./_components/sub-title-form";
import { DescriptionForm } from "./_components/description";
import { ImageForm } from "./_components/image-form";
// import { QuizSetForm } from "./_components/quiz-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import AlertBanner from "@/components/alert-banner";
import { IconBadge } from "@/components/icon-badge";
import { CategoryForm } from "./_components/category-form";
// import { useGetQuizsets } from "@/app/hooks/useQuiz";
import { useParams } from "next/navigation";
import { useCourseById } from "@/app/hooks/useCourseQueries";
import { useCategories } from "@/app/hooks/useCategoryQueries";

const EditCourse = () => {
  const params = useParams();
  const courseId = params?.courseId as string;

  const { data: course, isLoading: isLoadingCourse } = useCourseById(courseId);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // const { data: allQuizSets, isLoading } = useGetQuizsets();

  if (isLoadingCourse) return <p className="p-6">Loading...</p>;
  if (!course) return <p className="p-6 text-red-500">Course not found.</p>;
  const mappedCategories = categories?.map((c) => {
    return {
      value: c.title,
      label: c.title,
      id: c._id,
    };
  });
  // Sanitize fucntion for handle ObjectID and Buffer

  const modules = (course?.modules).sort((a, b) => a.order - b.order) || [];
  console.log('modules',modules)

  // let mappedQuizSet = [];
  // if (allQuizSets && allQuizSets.length > 0) {
  //   mappedQuizSet = allQuizSets.map((quizSet) => {
  //     return {
  //       value: quizSet.id,
  //       label: quizSet.title,
  //     };
  //   });
  // }
  return (
    <>
      {!course?.status && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}
      <div className="p-6">
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
              initialData={{
                imageUrl:course?.thumbnail}}
              courseId={courseId}
            />
            <CategoryForm
              initialData={{ value: course?.category?.title }}
              courseId={courseId}
              options={mappedCategories}
            />

            {/* <QuizSetForm
              initialData={{ quizSetId: course?.quizSet?.toString() }}
              courseId={courseId}
              options={mappedQuizSet}
            /> */}
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
