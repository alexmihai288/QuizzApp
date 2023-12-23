import { InputWrapper } from "@/app/(auth)/_components/InputWrapper";
import { FC } from "react";

interface CreateProjectHeaderProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title: string
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  topic:string
}

export const CreateProjectHeader: FC<CreateProjectHeaderProps> = ({
  setTitle,
  title,
  setTopic,
  topic
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-5 underline underline-offset-8 decoration-mainLightBlue">
        Create-Project | Header
      </h1>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <label className="font-bold text-white text-lg">Add a title</label>
          <InputWrapper
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            placeholder="ex: Big Bang Theory"
            className="max-w-sm"
          />
        </div>
        <div className="flex-1">
          <label className="font-bold text-white text-lg">Add a topic</label>
          <InputWrapper
            onChange={(e) => setTopic(e.target.value)}
            type="text"
            value={topic}
            placeholder="ex: Cosmic Inflation"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};
