import React from "react";
import Image from "next/image";
import { CardProps } from "@/types";
import { Button } from "@/components/common/Button";
import { UI_TEXT } from "@/constants";

export const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      key={id}
      className="group rounded-2xl overflow-hidden shadow-md border hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/fallback.jpg"} // fallback in case of empty src
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <Button onClick={onClick} className="mt-2">
          {UI_TEXT?.viewDetails || "View Details"}
        </Button>
      </div>
    </div>
  );
};

export default Card;
