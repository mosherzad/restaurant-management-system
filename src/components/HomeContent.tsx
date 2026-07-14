"use client";

import { useState } from "react";
import MealCard from "@/components/MealCard";
import MenuCategory from "@/components/MenuCategory";
import Rightbar from "@/components/Rightbar";

const meals = [
  {
    menuItemId: 1,
    name: "Pizza Margherita",
    description: "Classic pizza with mozzarella, tomato sauce, and basil.",
    price: 10,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    quantity: 1,
  },
  {
    menuItemId: 2,
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni and melted mozzarella cheese.",
    price: 12,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    quantity: 1,
  },
  {
    menuItemId: 3,
    name: "Chicken Burger",
    description: "Grilled chicken breast with lettuce, tomato, and cheese.",
    price: 8,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    quantity: 1,
  },
  {
    menuItemId: 4,
    name: "Beef Burger",
    description: "Juicy beef patty with cheddar cheese and special sauce.",
    price: 9,
    category: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    quantity: 1,
  },
  {
    menuItemId: 5,
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce, parmesan, croutons, and Caesar dressing.",
    price: 6,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    quantity: 1,
  },
  {
    menuItemId: 6,
    name: "Spaghetti Bolognese",
    description: "Traditional spaghetti with rich beef Bolognese sauce.",
    price: 11,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    quantity: 1,
  },
];

export default function HomeContent() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative mx-auto min-h-[calc(100vh-4.5rem)] w-full min-w-0 max-w-6xl md:min-h-screen">
      <div className="sticky top-0 z-20 bg-[#221810]/95 py-2 backdrop-blur-sm md:static md:bg-transparent md:py-0 md:backdrop-blur-none">
        <MenuCategory onOpenCart={() => setCartOpen(true)} />
      </div>
      <div className="no-scrollbar grid h-[calc(100vh-8rem)] w-full min-w-0 max-w-225 grid-cols-[minmax(0,1fr)] justify-items-center gap-4 overflow-x-hidden overflow-y-auto overscroll-x-none p-2 [scrollbar-gutter:stable] sm:grid-cols-[repeat(2,minmax(0,1fr))] sm:gap-6 sm:p-3 md:h-[calc(100vh-2.5rem)] md:gap-7 md:p-4 lg:grid-cols-[repeat(3,minmax(0,1fr))] lg:gap-9">
        {meals.map((meal) => (
          <MealCard key={meal.menuItemId} data={meal} />
        ))}
      </div>
      <Rightbar
        mobileOpen={cartOpen}
        onMobileClose={() => setCartOpen(false)}
      />
    </div>
  );
}
