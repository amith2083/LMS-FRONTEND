'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Filter } from 'lucide-react';

const PRICE_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
] as const;

interface FilterCourseMobileProps {
  categories: { _id: string; title: string }[];
  isLoading: boolean;
  selectedCategory: string;
  selectedPrice: string;
  onCategoryChange: (cat: string) => void;
  onPriceChange: (price: string) => void;
}

export default function FilterCourseMobile({
  categories,
  isLoading,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
}: FilterCourseMobileProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900">
            <Filter className="h-5 w-5" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-full max-w-xs p-0">
          <SheetHeader className="border-b p-6 pb-4">
            <SheetTitle className="text-left text-lg font-semibold">
              Filter Courses
            </SheetTitle>
          </SheetHeader>

          <div className="p-6 pt-4">
            <Accordion defaultValue={['categories', 'price']} type="multiple">
              {/* ---------- CATEGORIES (Radio - single select) ---------- */}
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Categories</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 animate-none">
                  {isLoading ? (
                    <p className="text-sm text-gray-500">Loading categories…</p>
                  ) : (
                    <RadioGroup
                      value={selectedCategory}
                      onValueChange={(val) =>
                        onCategoryChange(selectedCategory === val ? '' : val)
                      }
                    >
                      <ul className="space-y-3">
                        {categories.map((cat) => (
                          <li key={cat._id} className="flex items-center">
                            <RadioGroupItem value={cat._id} id={`mobile-cat-${cat._id}`} />
                            <label
                              htmlFor={`mobile-cat-${cat._id}`}
                              className="ml-3 text-sm text-gray-600 cursor-pointer"
                            >
                              {cat.title}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </RadioGroup>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* ---------- PRICE (Radio - single select) ---------- */}
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 animate-none">
                  <RadioGroup
                    value={selectedPrice}
                    onValueChange={(val) =>
                      onPriceChange(selectedPrice === val ? '' : val)
                    }
                  >
                    <ul className="space-y-3">
                      {PRICE_OPTIONS.map((opt) => (
                        <li key={opt.value} className="flex items-center">
                          <RadioGroupItem value={opt.value} id={`mobile-price-${opt.value}`} />
                          <label
                            htmlFor={`mobile-price-${opt.value}`}
                            className="ml-3 text-sm text-gray-600 cursor-pointer"
                          >
                            {opt.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}