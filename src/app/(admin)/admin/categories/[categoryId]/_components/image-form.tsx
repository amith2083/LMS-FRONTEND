"use client";

import { useEffect, useState } from "react";

// import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import * as z from "zod";
 
import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUpdateCategoryImage } from "@/app/hooks/useCategoryQueries";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});
type FormValues = z.infer<typeof formSchema>;
interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  categoryId: string;
}

export const ImageForm: React.FC<ImageFormProps> = ({ initialData, categoryId }) => {

  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const updateCategoryImage = useUpdateCategoryImage();


 





  const toggleEdit = () => setIsEditing((current) => !current);

 const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // await updateCourseImage.mutateAsync({ id: courseId, file: selectedFile });
      await updateCategoryImage.mutateAsync({ categoryId, file: selectedFile });
      toast.success("Category image updated!");
      toggleEdit();
    } catch (e: any) {
      toast.error(e.message || "Image upload failed");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Category Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className="space-y-4">
          <UploadDropzone onUpload={(files) => setSelectedFile(files[0])} />
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || updateCategoryImage.isPending}
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