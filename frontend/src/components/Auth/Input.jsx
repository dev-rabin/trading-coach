import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  error,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <div
        className={`mt-1 flex items-center border rounded-lg px-3 bg-black transition
        ${
          error
            ? "border-red-500"
            : "border-gray-700 focus-within:border-green-400"
        }`}
      >
        {icon && <div className="mr-2 text-gray-400">{icon}</div>}
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-sm p-2 bg-transparent outline-none text-white placeholder-gray-500"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
