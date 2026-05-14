import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Layout from "./components/layout";
import Stopwatch from "./components/stopwatch";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout を親ルートにして、子ページを Outlet に流し込む */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
