import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  //   const [cart, setCart] = useState([]);
  //   const [history, setHistory] = useState([]);
  //   const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/user_info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          //   setCart(res.data.user.cart);
          res.data.user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
          res.data.user.role === "seller"
            ? setIsSeller(true)
            : setIsSeller(false);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isSeller: [isSeller, setIsSeller],
  };
}

export default UserAPI;
