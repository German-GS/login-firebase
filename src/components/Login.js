import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(' ')
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);

      if(error.code === "auth/wrong-password"){
        setError('Contraseña invalida')
      }if (error.code === 'auth/user-not-found') {
        setError('El usuario no exite')
      }if(error.code === "auth/email-already-in-use"){
        setError('El correo ya esta en uso')

      }   
    }
  };

  return (
    <div>
      <h1>Login</h1>
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

        <button>Login</button>
      </form>
    </div>
  );
}
