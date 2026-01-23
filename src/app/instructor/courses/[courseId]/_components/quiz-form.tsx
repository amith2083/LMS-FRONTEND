"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateCourse } from "@/app/hooks/useCourseQueries";

interface QuizOption{
  value: string;
  label: string;
  id: string;
}
interface QuizFormProps{
title:string,
courseId:string,
options:QuizOption[]

}

const formSchema = z.object({
  value: z.string().min(1),
});
type FormValues = z.infer<typeof formSchema>;
export const QuizSetForm = ({
  title,
  courseId,
  options 
}:QuizFormProps) => {
 
    const [isEditing, setIsEditing] = useState(false);
    const {mutateAsync} = useUpdateCourse();
  const router = useRouter();


  

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
     value: title || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values:FormValues) => {
 
    try {
       const selectedQuizset = options.find(option => option.value === values.value);
    
      
  
      if (!selectedQuizset) {
      toast.error("Invalid quizset selected");
      return;
    }
      await mutateAsync({id:courseId, data: { quizSet: selectedQuizset.id }})

    
      toast.success("Course updated");
      toggleEdit();
      // router.refresh();
    } catch (error:any) {
      toast.error(error?.message||"Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Set
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Quiz Set
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !title && "text-slate-500 italic"
          )}
        >
          {title||  "No Quiz set selected"}
        </p>
      )}
      
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};