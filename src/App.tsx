import { Route, Routes } from "react-router-dom";
import { RtkQueryComponent, CoinListPage } from "./components/";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CoinListPage />} />
      </Routes>

      <RtkQueryComponent />
    </div>
  );
}
