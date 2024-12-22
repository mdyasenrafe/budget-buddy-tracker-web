import React, { CSSProperties, HTMLAttributes } from "react";
import { ColorKey, TextStyles, TextVariant, colors } from "../../../theme";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  className?: string;
  color?: ColorKey;
  style?: CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  variant = "body",
  children,
  className = "",
  color,
  style,
  ...props
}) => {
  const variantClassName = TextStyles[variant];
  const inlineStyle = {
    ...style,
    color: color ? colors[color] : undefined,
  };

  const textStyle = `${variantClassName} ${className} block`;

  return (
    <span className={textStyle} style={inlineStyle} {...props}>
      {children}
    </span>
  );
};
