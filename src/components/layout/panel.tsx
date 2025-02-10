import React from "react";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";

interface PanelProps extends React.ButtonHTMLAttributes<HTMLDivElement> {}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "p-4 bg-white rounded-md border border-border shadow-sm",
          className
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Panel.displayName = "Panel";
