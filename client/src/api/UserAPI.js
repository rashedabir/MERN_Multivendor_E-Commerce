import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/user_info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          setCart(res.data.user.cart);
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

  const addCart = async (product) => {
    if (!isLogged) {
      return toast.warn("Please Login or Registration to Continue Buying");
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      toast.warn("This Product is Already Added in Cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isSeller: [isSeller, setIsSeller],
    cart: [cart, setCart],
    addCart: addCart,
    callback: [callback, setCallback],
    history: [history, setHistory],
  };
}

export default UserAPI;
