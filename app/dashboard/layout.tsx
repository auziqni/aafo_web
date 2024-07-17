import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex relative">
      <Sidebar className="hidden lg:flex" />
      <div className=" flex flex-col w-full  overflow-clip">
        <Navbar />
        <div className="relative">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
