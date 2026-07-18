import { FaUtensils } from "react-icons/fa6";

type Category = {
  id: number;
  name: string;
  menuItem: {
    id: number;
  }[];
};
const CategoryList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    cache: "no-store",
  });

  const { categories } = await res.json();
  console.log(categories);

  if (categories.length === 0) {
    return (
      <section className="border border-white/10 bg-[#0F172A] p-6">
        <p className="text-center text-gray-400">No categories found.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl w-[50%] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-md lg:text-xl font-semibold text-white">
          Categories
        </h2>

        <span className="rounded-full bg-orange-500/20 px-3 py-1 text-sm text-orange-400">
          {categories.length}
        </span>
      </div>

      <div className="space-y-3">
        {categories.slice(0, 6).map((category: Category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-xl bg-[#111827] p-4 transition hover:bg-[#1A2438]"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-500/20 p-2">
                <FaUtensils className="text-orange-400" />
              </div>

              <div>
                <h3 className="font-medium text-white text-sm lg:text-md">
                  {category.name}
                </h3>

                <p className="text-xs text-gray-400">
                  {category.menuItem.length} meals
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
