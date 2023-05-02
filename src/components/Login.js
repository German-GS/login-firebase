import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/wrong-password") {
        setError("Contraseña inválida");
      }
      if (error.code === "auth/user-not-found") {
        setError("El usuario no existe");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("El correo ya está en uso");
      }
      if (error.code === "auth/missing-password") {
        setError("Debe llenar el espacio de la contraseña");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Por favor ingrese un correo electrónico válido");

    try {
      await resetPassword(user.email);
      setError("Te hemos enviado un correo electrónico al correo registrado");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      <h1 className="font-bold text-lg text-gray-600">Login</h1>
      {error && <Alert message={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold, mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="youremail@compani.ltd"
            id="email"
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold, mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="******"
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        <a href="" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleResetPassword} >Olvido su contraseña</a>

        </div>
        
      </form>

      <p className="my-4 text-sm flex justify-between px-3">No tienes una cuenta? <Link to={'/register'}>Registrar</Link> </p> 
      <button onClick={handleGoogleLogin} className="bg-slate-50 hover:bg-slate-200 rounded text-black shadow-md px-2 px-4 w-full" >Login with Google</button>
    
     
    </div>
  );
}
