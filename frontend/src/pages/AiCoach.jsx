import { Brain } from "lucide-react";

export default function AICoachScreen() {
  const messages = [
    {
      type: "danger",
      text: "Robin, this is forced. Skip.",
    },
    {
      type: "warning",
      text: "Robin, don't chase. Wait.",
    },
    {
      type: "danger",
      text: "Robin, you're emotional. Step away.",
    },
    {
      type: "warning",
      text: "Robin, stick to the plan.",
    },
    {
      type: "success",
      text: "Robin, good setup. Execute.",
    },
  ];

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-green-400 text-xs tracking-wide">
            ● LIVE COACHING
          </p>

          <h1 className="text-2xl font-bold">AI Trade Coach</h1>

          <p className="text-gray-400 text-sm">
            Real-time guidance for disciplined trading
          </p>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <CoachCard key={index} msg={msg} />
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 pt-4">
          Coaching powered by behavioral AI analysis
        </p>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function CoachCard({ msg }) {
  const styles = {
    danger: {
      border: "border-red-500/30",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]",
      accent: "bg-red-500",
      icon: "text-red-400",
    },
    warning: {
      border: "border-yellow-500/30",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.2)]",
      accent: "bg-yellow-500",
      icon: "text-yellow-400",
    },
    success: {
      border: "border-green-500/30",
      glow: "shadow-[0_0_20px_rgba(34,197,94,0.2)]",
      accent: "bg-green-500",
      icon: "text-green-400",
    },
  };

  const style = styles[msg.type];

  return (
    <div
      className={`relative flex items-center gap-4 p-4 rounded-2xl bg-[#111] border ${style.border} ${style.glow}`}
    >
      {/* Left Accent */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${style.accent} rounded-l-2xl`}
      />

      {/* Icon */}
      <div className={`p-2 rounded-xl bg-black ${style.icon}`}>
        <Brain size={18} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-1">COACH • Now</p>
        <p className="text-sm font-medium">{msg.text}</p>
      </div>
    </div>
  );
}
