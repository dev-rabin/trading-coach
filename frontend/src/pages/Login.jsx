import { BarChart3, Brain } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import FeatureCard from "../components/Auth/FeatureCard";
import Input from "../components/Auth/Input";
import Button from "../components/Auth/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/pre-trade-plan");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 text-white flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center w-1/2">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center 
            bg-gradient-to-br from-green-500/20 to-green-400/10 
            border border-green-500/20 shadow-md shadow-green-500/10"
          >
            <BarChart3 className="text-green-400" size={22} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="text-white">Trade</span>
            <span className="text-green-400">Mind</span>
          </h1>
        </div>

        <h2 className="text-4xl font-bold leading-tight mb-2">
          Stay disciplined today. <br /> Don't repeat yesterday's mistake.
        </h2>

        <p className="text-gray-300 mb-3 max-w-md text-xl">
          Most traders lose due to emotional decisions
        </p>
        <p className="text-gray-400 mb-10 max-w-md">
          <b className="text-green-400">Pause</b> <span>& </span>
          <b className="text-green-400">Think</b>. Follow your rules before
          entering a trade.
        </p>

        <div className="space-y-4">
          <FeatureCard
            title="Behavioral Analytics"
            desc="Deep insights into your trading patterns and emotional triggers"
            icon={<BarChart3 size={20} />}
          />

          <FeatureCard
            title="AI-Powered Insights"
            desc="Personalized recommendations to improve your trading discipline"
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
        <div className="w-full max-w-md bg-[#060606] border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-2">You're back</h2>
          <p className="text-gray-400 text-sm mb-6">
            Log in to evaluate your next trade.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <Input
              label="Email"
              placeholder="trader@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-400">Password</label>
                <span className="text-xs text-gray-500 hover:text-green-400 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <Input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
              />
            </div>
            <p className="text-xs text-center text-gray-400">
              Following your rules protects your capital
            </p>
            <Button
              text={
                status === "loading"
                  ? "Continuing..."
                  : "Continue Trading Smart"
              }
              disabled={status === "loading"}
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-xs text-gray-500 tracking-wider uppercase">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2 hover:bg-gray-800 transition">
              <FcGoogle size={20} />
              Google
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-6 text-center">
            Don’t have an account?{" "}
            <span
              className="text-green-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-4 text-center">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
