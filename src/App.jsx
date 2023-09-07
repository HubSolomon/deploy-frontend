import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import API from "./api";
import { ColorRing } from "react-loader-spinner";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const res = await API.get("user/getUser", { withCredentials: true });
      console.log(res.data._id);
      if (res.data._id) {
        setUser(res.data);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <>
          {" "}
          {user ? (
            <h2>Welcome {user.username}</h2>
          ) : (
            <>
              <Register />
              <Login user={user} setUser={setUser} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
