import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await axios.get(
        `/api/products?limit=${
          page * 8
        }&${category}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
      setLoading(false);
    };
    getProducts();
  }, [callback, category, page, sort, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    loading: [loading, setLoading],
  };
}

export default ProductsAPI;
