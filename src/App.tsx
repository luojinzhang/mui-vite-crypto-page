import { Route, Routes } from "react-router-dom";
import { RtkQueryComponent, CoinListPage, CoinDetailPage } from "./components/";
import { Bounce, Slide, ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="App">
      {/* App's routes */}
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path="/coins/:coinId" element={<CoinDetailPage />} />
      </Routes>

      {/* Redux toolkits query */}
      <RtkQueryComponent />

      {/* React-toastify */}
      <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss theme="light" transition={Slide} />
    </div>
  );
}
