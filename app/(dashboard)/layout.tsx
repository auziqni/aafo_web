import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative grid grid-cols-12 w-screen">
      <Sidebar className="hidden lg:flex col-span-2 " />
      <div className="relative flex flex-col w-full col-span-12 lg:col-span-10">
        <Navbar />
        <div className="relative">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
