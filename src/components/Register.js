import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Nuevo estado

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(' ')
    setLoading(true); // Cambio de estado

    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      if(error.code === "auth/internal-error"){
        setError('Correo invalido')
      }if (error.code === 'auth/weak-password') {
        setError('Contraseña no puede ser menor a 6 caracteres')
      } 
      if(error.code === "auth/email-already-in-use"){
        setError('El correo ya esta en uso')

      }
        
    } finally {
      setLoading(false); // Cambio de estado
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p> {error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@compani.ltd"
          id="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          placeholder="******"
        />

        <button disabled={loading}>{loading ? 'Loading...' : 'Register'}</button> {/* Botón deshabilitado mientras se carga */}
      </form>
    </div>
  );
}
