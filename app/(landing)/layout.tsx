import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default LandingLayout;
