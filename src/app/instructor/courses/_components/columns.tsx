"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GraduationCap, Star, ArrowUpDown, MoreHorizontal, Pencil, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { formatPrice } from "@/lib/formatPrice";

// Define the shape of your course data
export interface Course {
  _id: string;
  title: string;
  price: number;
  active: boolean;
}

// Strongly typed columns array
export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost" className="hover:bg-blue-200"
        onClick={() => column.toggleSorting()}
      >
        Title {column.getIsSorted() === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : column.getIsSorted() === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
    )}
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
     
   
    return(  <Button
        variant="ghost" className="hover:bg-blue-200"
        onClick={() => column.toggleSorting()}
      >
        Price {column.getIsSorted() === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : column.getIsSorted() === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
    )}
      </Button>
      
    )},
    cell: ({ row }) => {
     
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = formatPrice(price);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"className="hover:bg-blue-200"
        onClick={() => column.toggleSorting()}
      >
        Published {column.getIsSorted() === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : column.getIsSorted() === "desc" ? (
      <ArrowDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
    )}
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge className={cn("bg-gray-500", status ? "bg-green-600":'bg-black')}>
          {status ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/instructor/courses/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
            
            <Link href={`/dashboard/courses/${id}/enrollments`}>
              <DropdownMenuItem className="cursor-pointer">
                <GraduationCap className="h-4 w-4 mr-2" />
                View Enrollments
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/courses/${id}/reviews`}>
              <DropdownMenuItem className="cursor-pointer">
                <Star className="h-4 w-4 mr-2 fill-primary" />
                View Reviews
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
