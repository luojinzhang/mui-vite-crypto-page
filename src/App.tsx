import { Route, Routes } from "react-router-dom";
import { RtkQueryComponent, CoinListPage, CoinDetailPage } from "./components/";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path="/coins/:coinId" element={<CoinDetailPage />} />
      </Routes>

      <RtkQueryComponent />
    </div>
  );
}
