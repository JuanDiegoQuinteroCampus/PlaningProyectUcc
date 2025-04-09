// HeaderModule.jsx
import { CirclePlus } from "lucide-react";
import ButtonGradient from "@/Components/ButtonGradient";

export default function HeaderModule({ title, description, buttonText, onClick, showButton = true }) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>

      {showButton && (
        <ButtonGradient onClick={onClick}>
          <CirclePlus className="w-4 h-4" />
          {buttonText}
        </ButtonGradient>
      )}
    </div>
  );
}
