import { useEffect, useState } from "react";
import axios from "axios";

function CategoryAPI() {
  const [category, setCategory] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get("/api/category");
    setCategory(res.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    category: [category, setCategory],
    callback: [callback, setCallback],
  };
}

export default CategoryAPI;
