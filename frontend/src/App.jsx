import PreTradeScreen from "./pages/PreTrade";
import AnalyticsScreen from "./pages/Analytics";
import DisciplineScreen from "./pages/Displine";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import TradeHistoryScreen from "./pages/TradeHistory";
import AICoachScreen from "./pages/AiCoach";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/Home";
import TradeLogScreen from "./pages/TradeLog";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pre-trade-plan" element={<PreTradeScreen />} />
        <Route path="/analytics" element={<AnalyticsScreen />} />
        <Route path="/discipline" element={<DisciplineScreen />} />
        <Route path="/trade-log" element={<TradeLogScreen />} />
        <Route path="/trade-history" element={<TradeHistoryScreen />} />
      </Routes>
      {/* <AICoachScreen /> */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
