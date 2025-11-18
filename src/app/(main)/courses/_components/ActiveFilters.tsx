'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useCategories } from '@/app/hooks/useCategoryQueries';

interface ActiveFiltersProps {
  filter: {
    selectedCategory: string;
    price: string;          // <-- string
    sort: string;
  };
  onCategoryChange: (cat: string) => void;
  onPriceChange: (price: string) => void;   // <-- string
  onSortChange: (sort: string) => void;
}

/** Helper – toggle a value inside an array */
const toggle = (arr: string[], val: string) =>
  arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

export default function ActiveFilters({
  filter,
  onCategoryChange,
  onPriceChange,
  onSortChange,
}: ActiveFiltersProps) {
  // Resolve category title for the pill
  const { data: categories = [] } = useCategories();
 const catTitle = filter.selectedCategory
    ? categories.find(c => c._id === filter.selectedCategory)?.title
    : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Category pill */}
      {catTitle && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-full bg-muted text-sky-700 gap-1"
          onClick={() => onCategoryChange('')}
        >
          {catTitle}
          <X className="w-3 h-3" />
        </Button>
      )}

      {/* Price pill – only if price is set */}
      {filter.price && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-full bg-muted text-sky-700 gap-1"
          onClick={() => onPriceChange('')}
        >
          {filter.price.charAt(0).toUpperCase() + filter.price.slice(1)}
          <X className="w-3 h-3" />
        </Button>
      )}

  {/* Sort pill */}
      {filter.sort && (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-full bg-muted text-sky-700 gap-1"
          onClick={() => onSortChange('')}
        >
          {filter.sort.replace(/-/g, ' ')}
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
}