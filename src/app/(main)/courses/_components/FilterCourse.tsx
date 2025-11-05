'use client'

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

const PRICE_OPTIONS = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

interface FilterCourseProps {
  categories: any[];
  isLoading: boolean;
  selectedCategories: string[];
  selectedPrice: string[];
  onCategoriesChange: (categories: string[]) => void;
  onPriceChange: (price: string[]) => void;
}

const FilterCourse = ({
  categories,
  isLoading,
  selectedCategories,
  selectedPrice,
  onCategoriesChange,
  onPriceChange,
}: FilterCourseProps) => {
  const applyArrayFilter = ({ type, value }: { type: string; value: string }) => {
    const current = type === 'categories' ? selectedCategories : selectedPrice;
    const isFilterApplied = current.includes(value);

    if (isFilterApplied) {
      const newFilters = current.filter((v) => v !== value);
      if (type === 'categories') onCategoriesChange(newFilters);
      if (type === 'price') onPriceChange(newFilters);
    } else {
      const newFilters = [...current, value];
      if (type === 'categories') onCategoriesChange(newFilters);
      if (type === 'price') onPriceChange(newFilters);
    }
  };

  return (
    <div className="hidden lg:block">
      <Accordion defaultValue={["categories"]} type="multiple">
        {/* Categories filter */}
        <AccordionItem value="categories">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Categories</span>
          </AccordionTrigger>
        <AccordionContent className="pt-6 animate-none">
  {/* Remove the {isLoading ? <p>Loading...</p> : (...)} */}
  <ul className="space-y-4">
    {categories.map((category, index) => {
      const value = category.slug || category.value || category.title.toLowerCase();
      return (
        <li key={category._id} className="flex items-center">
          <Checkbox
            id={`category-${index}`}
            onCheckedChange={() => {
              applyArrayFilter({
                type: "categories",
                value,
              });
            }}
            checked={selectedCategories.includes(value)}
          />
          <label
            htmlFor={`category-${index}`}
            className="ml-3 text-sm text-gray-600 cursor-pointer"
          >
            {category.title || category.label}
          </label>
        </li>
      );
    })}
  </ul>
</AccordionContent>
        </AccordionItem>

        {/* Price filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Price</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {PRICE_OPTIONS.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <Checkbox
                    id={`price-${optionIdx}`}
                    onCheckedChange={() => {
                      applyArrayFilter({
                        type: "price",
                        value: option.value,
                      });
                    }}
                    checked={selectedPrice.includes(option.value)}
                  />
                  <label
                    htmlFor={`price-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterCourse;