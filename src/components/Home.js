import { useAuth } from "../context/authContext.js";


export function Home() {
  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {

    try {
      await logout();
    } catch (error) {
      console.log(error)
      
    }
  };

  if(loading){
    return (<h1>Loading</h1>)
  }

  console.log(user);
  return (
    <div className="w-full max-w-xs m-auto text-black"> 

    <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
    <h1 className="text-xl mb-4"> Welcome {user. displayName || user.email}</h1>

    </div>
   
        <button  className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>Logout</button>
    </div>
  );
}