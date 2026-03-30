import { Brain } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  "Analyzing your behavior...",
  "Checking your discipline...",
  "Validating your setup...",
];

const Loader = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); 
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-3">
        <div className="relative">
          <div className="p-5 rounded-full bg-green-500/20 text-green-400">
            <Brain size={32} />
          </div>
          <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl opacity-40 animate-pulse" />
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
        </div>
        <p
          className={`text-green-400 text-sm transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {messages[index]}
        </p>
      </div>
    </div>
  );
};

export default Loader;
