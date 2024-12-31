import { Text } from "@/components/atoms";
import React from "react";

type ProgressBarProps = {
  percentage: number;
  strokeColor?: string;
  backgroundColor?: string;
  height?: string;
  showLabel?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  strokeColor = "#52c41a",
  backgroundColor = "#e0e0e0",
  height = "10px",
  showLabel = true,
}) => {
  const progress = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="relative w-full">
      {showLabel && (
        <div
          className="absolute text-xs -top-4"
          style={{
            left: `${progress}%`,
            transform: "translateX(-50%)",
          }}
        >
          <Text variant="p5" className="!font-bold ">
            {" "}
            {progress.toFixed(1)}%
          </Text>
        </div>
      )}
      <div
        className="w-full rounded-full"
        style={{
          backgroundColor,
          height,
        }}
      >
        <div
          className="rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: strokeColor,
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};
