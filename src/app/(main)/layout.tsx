import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="min-w-0 px-3 pt-4 pb-20 sm:px-4 md:ml-50 md:px-5 md:pt-5 md:pb-5">
        {children}
      </main>
    </div>
  );
}
