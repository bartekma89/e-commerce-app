import React from "react";

interface ComponentProps {
  rating: number;
}

export default function Rating({ rating }: ComponentProps) {
  return <div className="text-blue-500 font-bold">{rating}</div>;
}
