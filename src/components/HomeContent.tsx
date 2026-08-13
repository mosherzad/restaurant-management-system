"use client";

import { useEffect, useState } from "react";
import MealCard from "@/components/MealCard";
import MenuCategory from "@/components/MenuCategory";
import Rightbar from "@/components/Rightbar";
import Link from "next/link";

interface Meal {
  id: number;
  name: string;
  description: string;
  category: { id: number; name: string; createdAt: string };
  price: number;
  image: string;
  quantity: number;
}

type HomeContentProps = {
  isAuth: boolean;
};
export default function HomeContent({ isAuth }: HomeContentProps) {
  const [cartOpen, setCartOpen] = useState(false);

  const [menu, setMenu] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);

        if (!res.ok) throw new Error("failed to fetch menu");

        const { menuItems } = await res.json();

        setMenu(menuItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className="relative mx-auto min-h-[calc(100vh-4.5rem)] w-full min-w-0 max-w-6xl md:min-h-screen">
      <div className="sticky top-0 z-20 bg-[#221810]/95 py-2 backdrop-blur-sm md:static md:bg-transparent md:py-0 md:backdrop-blur-none">
        <MenuCategory isAuth={isAuth} onOpenCart={() => setCartOpen(true)} />
      </div>
      <div className="no-scrollbar items-start grid h-[calc(100vh-8rem)] w-full min-w-0 max-w-225 grid-cols-[minmax(0,1fr)] justify-items-center gap-4 overflow-x-hidden overscroll-x-none p-2 [scrollbar-gutter:stable] sm:sm:grid-cols-2 sm:gap-6 sm:p-3 md:h-[calc(100vh-2.5rem)] md:gap-7 md:p-4 lg:grid-cols-3 lg:gap-9">
        {menu.map((meal, index) => (
          <MealCard
            key={meal.id}
            data={meal}
            isLCP={index === 0}
            isAuth={isAuth}
          />
        ))}
      </div>
      {isAuth && (
        <Rightbar
          mobileOpen={cartOpen}
          onMobileClose={() => setCartOpen(false)}
        />
      )}

      <Link
        href={"/login"}
        className="text-[10px] text-amber-600 flex items-center justify-center max-sm:hidden my-3 "
      >
        ONLY FOR RESTAURANT STAFF
      </Link>
    </div>
  );
}
