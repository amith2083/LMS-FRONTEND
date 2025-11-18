'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PRICE_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
] as const;

interface FilterCourseProps {
  categories: { _id: string; title: string }[];
  isLoading: boolean;
  selectedCategory: string;
  selectedPrice: string;           // <-- now string
  onCategoryChange: (cat: string) => void;
  onPriceChange: (price: string) => void;  // <-- string
}

/** Toggle a value inside an array (used only for price) */
const toggle = (arr: string[], val: string) =>
  arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];

export default function FilterCourse({
  categories,
  isLoading,
  selectedCategory,
  selectedPrice,
  onCategoryChange,
  onPriceChange,
}: FilterCourseProps) {
  const handlePrice = (value: string) => onPriceChange(toggle(selectedPrice, value));

  return (
    <div className="hidden lg:block ">
      <Accordion defaultValue={['categories', 'price']} type="multiple">
        {/* ---------- CATEGORY (single) ---------- */}
        <AccordionItem value="categories">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Categories</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : (
              <RadioGroup
                value={selectedCategory}
                onValueChange={id => onCategoryChange(selectedCategory === id ? '' : id)}
              >
                <ul className="space-y-4">
                  {categories.map(cat => (
                    <li key={cat._id} className="flex items-center">
                      <RadioGroupItem value={cat._id} id={`cat-${cat._id}`} />
                      <label
                        htmlFor={`cat-${cat._id}`}
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

      {/* ---------- PRICE (single – radio) ---------- */}
<AccordionItem value="price">
  <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
    <span className="font-medium text-gray-900">Price</span>
  </AccordionTrigger>
  <AccordionContent className="pt-6 animate-none">
    <RadioGroup
      value={selectedPrice}                          
      onValueChange={(val) => {
        onPriceChange(selectedPrice === val ? '' : val); // toggle clear
      }}
    >
      <ul className="space-y-4">
        {PRICE_OPTIONS.map((opt) => (
          <li key={opt.value} className="flex items-center">
            <RadioGroupItem value={opt.value} id={`price-${opt.value}`} />
            <label
              htmlFor={`price-${opt.value}`}
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
  );
}