import PreTradeScreen from "./pages/PreTrade";
import AnalyticsScreen from "./pages/Analytics";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import TradeHistoryScreen from "./pages/TradeHistory";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./pages/Home";
import TradeLogScreen from "./pages/TradeLog";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./features/auth/authSlice";
import ProtectedRoute from "./guards/protectedRoute";
import PublicRoute from "./guards/publicRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./components/layout/Loader";
import ProfileScreen from "./pages/UserProfile";
const queryClient = new QueryClient();

const Layout = () => {
  const dispatch = useDispatch();
  const { authStatus } = useSelector((state) => state.auth);
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (authStatus === "loading") {
    return <Loader/>
  }

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/pre-trade-plan"
          element={
            <ProtectedRoute>
              <PreTradeScreen />
            </ProtectedRoute>
          }
        />
        <Route path="/analytics" element={<AnalyticsScreen />} />
        <Route path="/trade-log" element={<TradeLogScreen />} />
        <Route path="/trade-history" element={<TradeHistoryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
