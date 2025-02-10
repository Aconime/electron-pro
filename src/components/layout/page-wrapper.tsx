import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

export const PageWrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-4", "p-4", className)}>
      {children}
    </div>
  );
};
