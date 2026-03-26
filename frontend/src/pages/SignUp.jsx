import Input from "../components/Auth/Input";
import FeatureCard from "../components/Auth/FeatureCard";
import Button from "../components/Auth/Button";
import { FcGoogle } from "react-icons/fc";
import { BarChart3, Brain, ChartColumn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup } from "../features/auth/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signupStatus, error } = useSelector((state) => state.auth);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required!";
    }
    if (!formData.email) {
      errors.email = "Email is required!";
    }
    if (!formData.password) {
      errors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters!";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await dispatch(signup(formData)).unwrap();
      navigate("/pre-trade-plan");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="my-6 text-white flex max-w-7xl mx-auto">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center w-1/2">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-500/20 shadow-md shadow-green-500/10">
            <BarChart3 className="text-green-400" size={22} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-white">Trade</span>
            <span className="text-green-400">Mind</span>
          </h1>
        </div>

        <h2 className="text-4xl font-bold leading-tight mb-2">
          Your AI Trading Coach <br /> for Better Discipline
        </h2>
        <p className="text-gray-400 mb-5 max-w-lg">
          Stop losing money due to emotional trades.
        </p>
        <p className="text-gray-400 mb-1 max-w-lg">
          TradeMind helps you catch bad decisions before you take them.
        </p>
        <p className="text-gray-400 mb-10 max-w-lg">
          Idenfity patterns. Follow your rules. Protect your capital.
        </p>

        <div className="space-y-4 max-w-lg">
          <FeatureCard
            icon={<ChartColumn size={20} />}
            title="Behavioral Analytics"
            desc="Understand why you lose trades"
          />
          <FeatureCard
            title="AI-Powered Insights"
            desc="Get real-time guidance before entry"
            icon={<Brain size={20} />}
          />
        </div>

        <div className="flex gap-2 my-6">
          <p className="text-xs text-gray-500 tracking-wider uppercase">
            Built for traders who want to stay{" "}
            <span className="text-green-400 font-medium">disciplined</span>
          </p>

          <div className="h-px w-10 bg-gray-800"></div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-end">
        <div className="w-full max-w-md bg-[#060606] p-8 rounded-2xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Start Your Discpline Journey
          </p>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
            />
            <Input
              label="Email"
              placeholder="trader@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
            />

            <Button
              text={
                signupStatus === "loading"
                  ? "Registering..."
                  : "Start Improving"
              }
              disabled={signupStatus === "loading"}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <p className="text-xs text-green-500 text-center">
              Check your next trade in 10 seconds
            </p>
          </form>
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2 hover:bg-gray-800">
              <FcGoogle size={20} />
              Google
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <span
              className="text-green-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
