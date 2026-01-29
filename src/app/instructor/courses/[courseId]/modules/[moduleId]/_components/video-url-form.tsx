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
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  url: z
    .instanceof(File)
    .refine((file) => file.type.startsWith("video/"), {
      message: "Please upload a valid video file",
    }),
  duration: z.string().min(1, { message: "Duration is required" }),
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const [state, setState] = useState({
    url: initialData?.url ?? "",
    duration:
      initialData?.duration != null
        ? formatDuration(initialData.duration) ?? ""
        : "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: undefined,
      duration: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const uploadSignedUrl = useUploadSignedUrl();
  const { mutateAsync: updateLesson } = useUpdateLesson();

  // Auto-detect duration when file is selected
  const handleFileChange = (file: File | undefined) => {
    if (!file) {
      form.setValue("duration", "");
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src); // Clean up memory

      const duration = video.duration;
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = Math.floor(duration % 60);

      const formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      form.setValue("duration", formatted,{ shouldValidate: true });
      toast.success("Duration detected automatically!");
    };

    video.onerror = () => {
      toast.error("Could not read video duration. Please enter manually.");
    };

    video.src = URL.createObjectURL(file);
  };

  const onSubmit = async (values: FormValues) => {
    const file = values.url;
if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    try {
      const durationParts = values.duration.split(":").map(Number);
      if (durationParts.length !== 3 || durationParts.some(isNaN)) {
        toast.error("Invalid duration format. Use HH:MM:SS");
        return;
      }

      const [hours, minutes, seconds] = durationParts;
      const totalDuration = hours * 3600 + minutes * 60 + seconds;

      const { signedUrl, key } = await uploadSignedUrl.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });
      // Use XMLHttpRequest for progress tracking
      const uploadPromise = new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", signedUrl);
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(file);
      });
      await uploadPromise

      // const uploadRes = await fetch(signedUrl, {
      //   method: "PUT",
      //   body: file,
      //   headers: {
      //     "Content-Type": file.type,
      //   },
      // });

      // if (!uploadRes.ok) {
      //   throw new Error("Failed to upload video to S3");
      // }

      await updateLesson({
        id: lessonId,
        data: { videoKey: key, duration: totalDuration },
        moduleId,
      });

      setState({
        url: key,
        duration: values.duration,
      });

      toast.success("Video uploaded successfully!");
      toggleEdit();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed";
      console.error("Upload error:", message);
      toast.error(message);
    }finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson Video
        <Button variant="ghost" onClick={toggleEdit} disabled={isUploading}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {state.url ? "Change Video" : "Add Video"}
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          <p className="text-sm mt-2">
            {state.url ? `Duration: ${state.duration}` : "No video uploaded"}
          </p>
          {state.url && (
            <div className="mt-6 aspect-video">
              <VideoPlayer videoKey={state.url} />
            </div>
          )}
        </>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
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
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                        handleFileChange(file);
                        
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration (auto-detected)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 00:15:30"
                      {...field}
                      disabled 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
{/* Progress bar – only shown during upload */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading video...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {uploadProgress < 100
                    ? "Do not close this page. Large videos may take several minutes."
                    : "Finalizing..."}
                </p>
              </div>
            )}
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting || isUploading} type="submit">
                {isUploading
                  ? "Uploading..."
                  : isSubmitting
                  ? "Saving..."
                  : "Save Video"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

// Helper function 
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}