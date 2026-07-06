import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <h1 className="text-center text-4xl mt-20">
      TaskFlow AI
    </h1>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}