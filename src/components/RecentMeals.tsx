import { FaUtensils } from "react-icons/fa6";
import Link from "next/link";
import { getAllMeals } from "@/api-calls/mealApiCall";

type Meal = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
};

const RecentMeals = async () => {
  const { menuItems } = await getAllMeals();

  const latestMeal = menuItems?.slice(0, 7);
  return (
    <section className="rounded-2xl p-6 w-[50%]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-md lg:text-xl font-semibold text-white">
          Recent Meals
        </h2>

        <Link
          href="/menu"
          className="text-sm text-orange-400 hover:text-orange-300"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {latestMeal.map((meal: Meal) => (
          <div
            key={meal.id}
            className="flex items-center justify-between rounded-xl bg-[#111827] p-4 transition hover:bg-[#1A2438]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/20 p-2">
                <FaUtensils className="text-orange-400" />
              </div>

              <div>
                <h3 className="font-medium text-white text-sm lg:text-md">
                  {meal.name}
                </h3>

                <p className="text-xs text-gray-400">{meal.category.name}</p>
              </div>
            </div>

            <span className="font-semibold text-green-400 text-sm">
              ${meal.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentMeals;
