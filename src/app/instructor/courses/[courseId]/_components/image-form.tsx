"use client";
import { useState } from "react";
import Image from "next/image";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UploadDropzone } from "@/components/file-upload";
import { useUpdateCourseImage } from "@/app/hooks/useCourseQueries";
interface ImageFormProps{
  imageUrl:string,
  courseId:string
}
export const ImageForm = ({imageUrl,courseId}:ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {mutateAsync,isPending} = useUpdateCourseImage();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
     
      await mutateAsync({ courseId, file: selectedFile });
      toast.success("Course image updated!");
      toggleEdit();
    } catch (e: any) {
      toast.error(e.message || "Image upload failed");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            "Cancel"
          ) : imageUrl ? (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit Image
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Course Thumbnail"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div className="space-y-4">
          <UploadDropzone onUpload={(files) => setSelectedFile(files[0])} />
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isPending}
          >
            Upload
          </Button>
          <div className="text-xs text-muted-foreground">
            Recommended: 16:9 aspect ratio
          </div>
        </div>
      )}
    </div>
  );
};
