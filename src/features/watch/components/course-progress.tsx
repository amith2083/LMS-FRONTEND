import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};
 
const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};


interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm" | number;
}

export const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress
        value={value}
        className={cn("h-2", !variant && "text-sky-700")}
      />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          typeof size === "string" ? sizeByVariant[size || "default"] : ""
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};

