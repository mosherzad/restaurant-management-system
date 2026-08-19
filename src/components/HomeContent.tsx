"use client";

import { useState } from "react";
import MealCard from "@/components/MealCard";
import MenuCategory from "@/components/MenuCategory";
import Rightbar from "@/components/Rightbar";
import Link from "next/link";
import { jwtPayload } from "@/lib/types";

interface Meal {
  id: number;
  name: string;
  description: string;
  available: boolean;
  categoryId: number;
  category: { id: number; name: string; createdAt: string };
  price: number;
  image: string;
  quantity: number;
}

type HomeContentProps = {
  payload: jwtPayload | null;
  menuItems: Meal[];
};
export default function HomeContent({ menuItems, payload }: HomeContentProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredMenu =
    selectedCategory === null
      ? menuItems
      : menuItems.filter((meal) => meal.categoryId === selectedCategory);

  const categories = Array.from(
    new Map(
      menuItems.map((meal) => [meal.category.id, meal.category]),
    ).values(),
  );

  return (
    <div className="relative mx-auto h-[calc(100vh-5.5rem)] w-full min-w-0 max-w-6xl">
      <div className="sticky top-0 z-20 bg-[#221810]/95 py-2 backdrop-blur-sm md:bg-transparent md:py-0 md:backdrop-blur-none">
        <MenuCategory
          payload={payload}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenCart={() => setCartOpen(true)}
        />
      </div>
      <div className="no-scrollbar mt-5 items-start grid h-[calc(100vh-8rem)] w-full min-w-0 max-w-225 grid-cols-[minmax(0,1fr)] justify-items-center gap-4 overflow-x-hidden overscroll-x-none p-2 [scrollbar-gutter:stable] sm:grid-cols-2 sm:gap-6 sm:p-3 md:h-[calc(100vh-2.5rem)] md:gap-7 md:p-4 lg:grid-cols-3 lg:gap-9">
        {filteredMenu.map((meal, index) => (
          <MealCard
            key={meal.id}
            data={meal}
            isLCP={index === 0}
            payload={payload}
          />
        ))}
      </div>
      {payload && (
        <Rightbar
          mobileOpen={cartOpen}
          onMobileClose={() => setCartOpen(false)}
        />
      )}

      {!payload && (
        <Link
          href={"/login"}
          className="text-[10px] hover:underline text-amber-600 flex items-center justify-center max-sm:hidden my-3 "
        >
          ONLY FOR RESTAURANT STAFF
        </Link>
      )}
    </div>
  );
}
