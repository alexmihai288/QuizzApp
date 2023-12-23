import React from "react";
import { SignUpForm } from "../_components/SignUpForm";

const page = () => {
  return (
    <div className="min-h-screen bg-mainOrange">
      <div className="container pt-10 sm:p-10 md:p-20">
        <div className="p-1 border-2 border-mainLightBlue rounded-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default page;
