'use client'
import { columns } from "@/features/categories/components/columns";
import { DataTable } from "@/features/categories/components/data-table";



import { JSX } from "react";
import { useCategories } from "@/features/categories/hooks/useCategoryQueries";

// Define a generic type for course objects (you can replace it with a specific interface if you have one)
interface Category {
  [key: string]: any;
}

const CategoryPage =  (): JSX.Element => {
 
    const { data: categories, isLoading,error } = useCategories();
 
  console.log(categories);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !categories) {
    return <div>Error: Category not found</div>;
  }

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryPage;
