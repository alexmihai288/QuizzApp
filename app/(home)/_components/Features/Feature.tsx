import { FC } from "react";

interface FeatureProps {
  title: string;
  description: string;
  logo: React.ReactNode;
}

export const Feature: FC<FeatureProps> = ({ title, description, logo }) => {
  return (
    <div className="border-2 border-mainLightBlue p-1 rounded-sm max-w-md">
      <div className="bg-white p-5 rounded-sm">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-xl">{title}</h1>
          {logo}
        </div>
        <p className="mt-5 ml-2.5">{description}</p>
      </div>
    </div>
  );
};
