import { fetchDashboardData } from "@/api-calls/dashboardApiCalls";
import { getUsers } from "@/api-calls/userApiServerCalls";
import AddCategory from "@/components/AddCategory";
import AddMeal from "@/components/AddMeal";
import CategoryList from "@/components/CategoryList";
import DashboardHeader from "@/components/DashboardHeader";
import { OrderOverview } from "@/components/OrderOverview";
import RecentMeals from "@/components/RecentMeals";
import RecentOrders from "@/components/RecentOrders";
import StatusCard from "@/components/StatusCard";
import UserTable from "@/components/UserTable";

const Dashboard = async () => {
  const [statics, userData] = await Promise.all([
    fetchDashboardData(),
    getUsers(),
  ]);
  const { users } = userData;

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
      <div className="my-5">
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
