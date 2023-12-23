import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

export default function QuizzLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Navbar />
      <Toaster />
      {children}
    </QueryProvider>
  );
}
