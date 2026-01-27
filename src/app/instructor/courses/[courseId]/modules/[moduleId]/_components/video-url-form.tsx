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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VideoPlayer } from "@/components/video-player";

import { useUpdateLesson, useUploadSignedUrl } from "@/app/hooks/useLesssonQueries";
import { formatDuration } from "@/lib/duration";

const formSchema = z
  .object({
    url: z.instanceof(File).optional(),
    duration: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.url instanceof File, {
    message: "Video file is required",
    path: ["url"],
  });

type FormValues = z.infer<typeof formSchema>;

interface VideoUrlFormProps {
  initialData: {
    url?: string;
    duration?: number;
  };
  courseId: string;
  lessonId: string;
  moduleId: string;
}

export const VideoUrlForm: React.FC<VideoUrlFormProps> = ({
  initialData,
  lessonId,
  moduleId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const [state, setState] = useState({
    url: initialData?.url ?? "",
    duration: initialData?.duration != null ? (formatDuration(initialData.duration) ?? "") : "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
      duration: state.duration as string,
    },
  });

  const { isSubmitting, isValid } = form.formState;
 const uploadSignedUrl = useUploadSignedUrl();
  const { mutateAsync: updateLesson } = useUpdateLesson();
  const onSubmit = async (values: FormValues) => {
    const file = values.url;
    if (!(file instanceof File)) {
      toast.error("Video file is required");
      return;
    }

    try {
      const durationParts = values.duration.split(":").map(Number);
      if (durationParts.length !== 3) {
        toast.error("Duration must be in HH:MM:SS format");
        return;
      }
      const [hours, minutes, seconds] = durationParts;
      const totalDuration = hours * 3600 + minutes * 60 + seconds;

      const { signedUrl, key } = await uploadSignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });

      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadRes.ok) {
        throw new Error("S3 upload failed");
      }

      await updateLesson({
        id: lessonId,
        data: { videoKey: key, duration: totalDuration },
        moduleId,
      });

      setState({
        url: key,
        duration: values.duration,
      });
      toast.success("Lesson updated");
      toggleEdit();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("Error in onSubmit:", message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">
            {state?.url || "No video uploaded"}
          </p>
          {state?.url ? (
            <div className="mt-6">
              <VideoPlayer videoKey={state.url} />
            </div>
          ) : null}
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values: FormValues) => onSubmit(values))}
            className="space-y-4 mt-4"
          >
            {/* url */}
            <FormField
  control={form.control}
  name="url"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Upload Video</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="video/*"
          onChange={(e) => field.onChange(e.target.files?.[0])}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. '10:30:18'"
                      {...field}
                    />
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
