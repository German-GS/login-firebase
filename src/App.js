import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.js";
import { Login } from "./components/Login.js";
import { Register } from "./components/Register.js";
import { AuthProvider } from "./context/authContext.js";

function App() {
  return (
    <div class="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
