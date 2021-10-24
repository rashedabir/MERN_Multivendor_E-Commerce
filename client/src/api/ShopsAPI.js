import { useEffect, useState } from "react";
import axios from "axios";

function ShopsAPI() {
  const [shops, setShops] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get("/api/shops");
    setShops(res.data.shops);
  };

  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    shops: [shops, setShops],
    callback: [callback, setCallback],
  };
}

export default ShopsAPI;