import { useAuth } from "../context/authContext.js";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if(loading){
    return (<h1>Loading</h1>)
  }

  console.log(user);
  return (
    <div>
        <h1> Welcome {user.email}</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  );
}