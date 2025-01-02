import { Route, Routes } from "react-router-dom";
import { RtkQueryComponent, CoinListPage, CoinDetailPage, NavigationBar } from "./components/";
import { Slide, ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="App">
      {/* Header */}
      <NavigationBar />

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
