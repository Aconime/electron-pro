import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Icon } from "@/components/shared/icon";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: IconProp;
  iconSide?: "left" | "right";
  iconSize?: SizeProp;
  iconWidth?: number;
  iconColor?: string;
  iconVisible?: boolean;
  loading?: boolean;
  loadingContrast?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingContrast = false,
      icon,
      iconSide = "left",
      iconSize,
      iconWidth,
      iconColor,
      iconVisible = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          "flex flex-row gap-2 items-center",
          loading && "text-transparent cursor-not-allowed",
          disabled && "cursor-not-allowed",
          className
        )}
        disabled={loading || disabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <Icon
            icon={faSpinner}
            className={cn(
              "absolute animate-spin",
              loadingContrast ? "text-slate-700" : "text-white"
            )}
          />
        )}
        {iconVisible && icon && iconSide === "left" && (
          <Icon icon={icon} size={iconSize} width={iconWidth} />
        )}
        {children}
        {iconVisible && icon && iconSide === "right" && (
          <Icon icon={icon} size={iconSize} width={iconWidth} />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
