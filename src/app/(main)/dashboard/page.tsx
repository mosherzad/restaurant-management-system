import { fetchDashboardData } from "@/api-calls/dashboardApiCalls";
import AddCategory from "@/components/AddCategory";
import AddMeal from "@/components/AddMeal";
import CategoryList from "@/components/CategoryList";
import DashboardHeader from "@/components/DashboardHeader";
import { OrderOverview } from "@/components/OrderOverview";
import RecentMeals from "@/components/RecentMeals";
import RecentOrders from "@/components/RecentOrders";
import StatusCard from "@/components/StatusCard";

const Dashboard = async () => {
  const statics = await fetchDashboardData();

  return (
    <div>
      <DashboardHeader />
      <StatusCard statics={statics} />
      <div className="flex flex-col lg:flex-row  gap-5 mt-3">
        <OrderOverview />
        <RecentOrders />
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        <div className="bg-[#0F172A] flex w-full lg:w-[40%] rounded-2xl">
          <AddCategory />
          <CategoryList />
        </div>

        <div className="bg-[#0F172A] flex w-full lg:w-[60%] rounded-2xl">
          <AddMeal categories={statics.categories} />
          <RecentMeals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
