import { Feature } from "./Feature";
import { MessageSquarePlus, Scale, Wand2 } from "lucide-react";

export const Features = () => {
  return (
    <div className="mt-20 flex flex-col gap-5 lg:flex-row lg:items-center justify-center">
      <Feature
        title="Sleek Design"
        description="Enjoy a smooth and visually appealing quiz experience with our app's sleek and user-friendly design."
        logo={<Wand2 className="text-mainLightBlue" />}
      />{" "}
      <Feature
        title="Instant Feedback"
        description="Get real-time feedback on your answers, keeping the excitement alive and promoting active learning."
        logo={<MessageSquarePlus className="text-mainLightBlue" />}
      />
      <Feature
        title="Lightweight"
        description="Lightweight app guarantees a quick and efficient quiz experience, prioritizing speed and responsiveness for seamless interaction."
        logo={<Scale className="text-mainLightBlue" />}
      />
    </div>
  );
};
