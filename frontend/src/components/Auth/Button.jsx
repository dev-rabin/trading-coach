import { ArrowRight } from "lucide-react";

export default function Button({ text }) {
  return (
    <button className="w-full bg-green-500 hover:bg-green-600 text-black transition rounded-lg p-1.5 flex items-center justify-center gap-2 font-medium cursor-pointer">
      {text} <ArrowRight size={18} />
    </button>
  );
}
