import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Drop-in replacement for <input type="password" /> with a show/hide eye toggle.
// All other props (value, onChange, name, disabled, placeholder, required...) pass through.
export default function PasswordInput({ className = "", iconColorClass = "", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input type={visible ? "text" : "password"} className={`${className} pr-10`} {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${
          iconColorClass || "text-gray-400 hover:text-gray-600"
        }`}
      >
        {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}
