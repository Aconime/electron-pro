import React from "react";
import { cn } from "@/utils/cn";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = ({
  className,
  type,
  icon,
  color,
  size,
  width,
  height,
  onClick,
}: {
  className?: string;
  icon: IconProp;
  color?: string;
  type?: string;
  size?: SizeProp;
  width?: number;
  height?: number;
  onClick?: () => void;
}) => {
  return (
    <FontAwesomeIcon
      color={color}
      type={type ? type : undefined}
      size={size ? size : "1x"}
      className={cn([className ? className : null].join(" "))}
      icon={icon}
      width={width ? width : 14}
      height={height ? height : 14}
      onClick={onClick}
    />
  );
};
