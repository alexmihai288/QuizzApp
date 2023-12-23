import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster />
      {children}
    </QueryProvider>
  );
};

export default DashLayout;
