import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster />
      <Navbar />
      {children}
    </QueryProvider>
  );
};

export default AuthLayout;
