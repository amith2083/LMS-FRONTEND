"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LessonList } from "./lesson-list";
import { LessonModal } from "./lesson-modal";
import { useCreateLesson, useLessonById } from "@/app/hooks/useLesssonQueries";
import { getSlug } from "@/lib/slug";
import { Lesson } from "@/app/types/lesson";

const formSchema = z.object({
  title: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;
interface LessonFormProps {
  initialData?: Lesson[];
  moduleId: string;
  courseId: string;
}

type ReorderData = {
  id: string;
  position: number;
};

export const LessonForm: React.FC<LessonFormProps> = ({
  initialData = [],
  moduleId,
  courseId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>(initialData);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { data: foundLesson } = useLessonById(selectedLessonId || "");
  const createLesson = useCreateLesson(moduleId);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (foundLesson) {
      setLessonToEdit(foundLesson);
      setIsEditing(true);
    }
  }, [foundLesson]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: FormValues) => {
    try {
      const payload = {
        title: values.title,
        slug: getSlug(values.title),
        order: lessons.length.toString(),
      };

      const lesson = await createLesson.mutateAsync(payload);

      setLessons((prev) => [...prev, lesson]);
      toast.success("Lesson created");
      toggleCreating();
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const onEdit = (id: string) => {
    setSelectedLessonId(id);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Module Lessons
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !lessons?.length && "text-slate-500 italic"
          )}
        >
          {!lessons?.length && "No module"}
          <LessonList onEdit={onEdit} items={lessons} />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag & Drop to reorder the modules
        </p>
      )}

      {lessonToEdit && (
        <LessonModal
          open={isEditing}
          setOpen={setIsEditing}
          courseId={courseId}
          lesson={lessonToEdit}
          moduleId={moduleId}
          onClose={() => {
            setLessonToEdit(null);
            setSelectedLessonId(null);
          }}
          onDeleted={(id) => {
            setLessons((prev) => prev.filter((l) => l._id !== id));
          }}
          // onUpdated={(updatedLesson: Lesson) => {
          //   setLessons((prev) =>
          //     prev.map((l) =>
          //       l._id === updatedLesson._id
          //         ? { ...l, title: updatedLesson.title }
          //         : l
          //     )
          //   );
          // }}
        />
      )}
    </div>
  );
};
