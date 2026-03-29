'use client'
import {
  CircleDollarSign,
  ListChecks,
} from "lucide-react";


import { TitleForm } from "@/features/categories/components/category-title-form";
import { DescriptionForm } from "@/features/categories/components/category-description-form";
import { ImageForm } from "@/features/categories/components/category-image-form";
import AlertBanner from "@/components/shared/alert-banner";
import { IconBadge } from "@/components/ui/icon-badge";
import { Category } from "@/features/categories/types/category";
import { CategoryActions } from "@/features/categories/components/category-actions";
import { useCategoryById } from "@/features/categories/hooks/useCategoryQueries";




interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const EditCategory =  ({ params }: CategoryPageProps) => {
    const{categoryId}= params
   
console.log('EditCategory categoryId', categoryId);
 const { data:category ,isLoading,error } = useCategoryById(categoryId);
 console.log('cater',category)
 if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !category) {
    return <div>Error: Category not found</div>;
  }

  // const category = await getCategory(categoryId);
  
   // Sanitize fucntion for handle ObjectID and Buffer




//  const rawmodules = await replaceMongoIdInArray(course?.modules).sort((a,b) => a.order - b.order)||[];

//  const modules = sanitizeData(rawmodules);
  return (
    <>
       {
     !category?.status &&  <AlertBanner
     label="This category is unpublished. It will not be visible in the course."
     variant="warning"
   />
    }
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CategoryActions categoryId ={categoryId} status ={category?.status} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">Customize your category</h2>
            </div>
            <TitleForm
              initialData={{ title: category?.title }}
              categoryId={categoryId}
            />
          
            <DescriptionForm
              initialData={{ description: category?.description }}
              categoryId={categoryId}
            />
            <ImageForm
                        initialData={{
                          imageUrl:category?.thumbnail}}
                        categoryId={categoryId}
                      />
           
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EditCategory;


