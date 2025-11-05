'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filter: {
    categories: string[];
    price: string[];
    sort: string;
  };
  onCategoriesChange: (categories: string[]) => void;
  onPriceChange: (price: string[]) => void;
  onSortChange: (sort: string) => void;
}

const ActiveFilters = ({ filter, onCategoriesChange, onPriceChange, onSortChange }: ActiveFiltersProps) => {
  const applyArrayFilter = ({ type, value }: { type: string; value: string }) => {
    if (type === 'sort') {
      onSortChange(value === filter.sort ? '' : value);
      return;
    }
    const isFilterApplied = filter[type as keyof typeof filter].includes(value as any);

    if (isFilterApplied) {
      const current = filter[type as keyof typeof filter] as string[];
      const newFilters = current.filter((v) => v !== value);
      if (type === 'categories') onCategoriesChange(newFilters);
      if (type === 'price') onPriceChange(newFilters);
    } else {
      const current = filter[type as keyof typeof filter] as string[];
      const newFilters = [...current, value];
      if (type === 'categories') onCategoriesChange(newFilters);
      if (type === 'price') onPriceChange(newFilters);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* active categories */}
      {filter.categories.length > 0 &&
        filter.categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() =>
              applyArrayFilter({ type: "categories", value: category })
            }
          >
            {category}
            <X className="w-3" />
          </Button>
        ))}
      {/* active prices */}
      {filter.price.length > 0 &&
        filter.price.map((p) => (
          <Button
            key={p}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => applyArrayFilter({ type: "price", value: p })}
          >
            {p}
            <X className="w-3" />
          </Button>
        ))}
      {/* active sort */}
      {filter.sort && (
        <Button
          variant="ghost"
          className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
          onClick={() => applyArrayFilter({ type: "sort", value: filter.sort })}
        >
          {filter.sort}
          <X className="w-3" />
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;