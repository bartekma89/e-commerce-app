import React from "react";

import { classNames } from "@/lib/helpers";

interface ComponentProps {
  rating: number;
  className?: string;
}

export default function Rating({ rating, className = "" }: ComponentProps) {
  return (
    <div className={classNames("text-blue-500 font-bold", className)}>
      {rating}
    </div>
  );
}
