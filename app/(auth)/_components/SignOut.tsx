"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <Button variant="normalOutline" onClick={() => signOut()}>
      Sign out
    </Button>
  );
};
