import React from "react";
import { SignInForm } from "../_components/SignInForm";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="min-h-screen bg-mainOrange">
      <div className="container pt-10 sm:p-10 md:p-20">
        <div className="p-1 border-2 border-mainLightBlue rounded-sm">
          <SignInForm signInError={searchParams.error} />
        </div>
      </div>
    </div>
  );
};

export default page;
