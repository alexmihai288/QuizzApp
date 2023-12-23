"use client";
import { Input } from "@/components/ui/input";
import { useShowPassword } from "@/hooks/use-show-pass";
import { cn } from "@/lib/utils";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";

interface InputWrapperProps {
  placeholder?: string;
  name?: string;
  className?: string;
  type: string;
  icon?: React.ReactNode;
  fixedType?: string;
  register?: any;
  error?: FieldError;
  onChange?: (e: any, i: number) => void;
  value?: string;
}

export const InputWrapper: FC<InputWrapperProps> = ({
  placeholder,
  name,
  className,
  type,
  icon,
  fixedType,
  register,
  error,
  onChange,
  value,
}) => {
  const { onClick } = useShowPassword();

  const [showError, setShowError] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      setShowError(true);
      const id = setTimeout(() => {
        setShowError(false);
      }, 3000);
      setTimeoutId(id);
    }
    // Cleanup the timeout when the component unmounts or when the error changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error, timeoutId]);

  return icon ? (
    <>
      <div className="flex items-center border border-mainLightBlue rounded-sm p-2.5">
        <Input
          placeholder={placeholder}
          name={name}
          className={className}
          type={type}
          {...(register && { ...register(name) })}
        />
        {fixedType === "password" ? (
          <div onClick={() => onClick()}>{icon}</div>
        ) : (
          <div>{icon}</div>
        )}
      </div>
      {error?.message && showError && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
    </>
  ) : (
    <>
      <Input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        name={name}
        className={cn(
          className,
          "border border-mainLightBlue rounded-sm p-2.5"
        )}
        type={type}
        {...(register && { ...register(name) })}
      />
      {error?.message && showError && (
        <p className="text-sm text-red-600">{error.message}</p>
      )}
    </>
  );
};
