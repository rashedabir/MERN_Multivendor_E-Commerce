import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "40px auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  title: {
    textTransform: "uppercase",
    padding: "15px 0",
    borderBottom: "1px solid #eee",
  },
  inputFeild: {
    width: "100%",
    marginBottom: "13px",
  },
}));

function EditProduct() {
  const classes = useStyles();
  const history = useHistory();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoryAPI.category;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state.productsAPI.callback;
  const [sellerCallback, setSellerCallback] =
    state.sellerProducts.sellerCallback;
  const [products] = state.sellerProducts.sellerProducts;
  const [onEdit, setOnEdit] = useState(false);
  const [_id, setId] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setOnEdit(true);
          setId(product._id);
          setProductId(product.product_id);
          setTitle(product.title);
          setPrice(product.price);
          setDescription(product.description);
          setImage(product.images);
          setCategory(product.category);
        }
      });
    } else {
      setOnEdit(false);
      setId("");
      setProductId("");
      setTitle("");
      setPrice();
      setDescription("");
      setImage(false);
      setCategory("");
    }
  }, [params.id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(
          `https://shop-clue.herokuapp.com/api/product/${_id}`,
          {
            title: title,
            price: price,
            description: description,
            images: image,
            category: category,
          },
          { headers: { Authorization: token } }
        );
        toast.info("Product Updated.");
      } else {
        await axios.post(
          "https://shop-clue.herokuapp.com/api/products",
          {
            product_id: productId,
            title: title,
            price: price,
            description: description,
            images: image,
            category: category,
          },
          { headers: { Authorization: token } }
        );
        toast.success("Product Created.");
      }
      setSellerCallback(!sellerCallback);
      setCallback(!callback);
      history.push("/seller_product");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post(
        "https://shop-clue.herokuapp.com/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      setLoading(false);
      setImage(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://shop-clue.herokuapp.com/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xl={5} lg={5} md={5} xs={12}>
            <div className="upload">
              <input
                type="file"
                name="file"
                id="file_up"
                onChange={handleUpload}
              />
              {loading ? (
                "Uploading..."
              ) : (
                <Paper
                  className={classes.paper}
                  id="file_img"
                  style={styleUpload}
                >
                  <img src={image ? image.url : ""} alt="" />
                  <span onClick={handleDestroy}>X</span>
                </Paper>
              )}
            </div>
          </Grid>
          <Grid item xl={7} lg={7} md={7} xs={12}>
            <Paper className={classes.paper}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {onEdit ? "update product" : "create product"}
              </Typography>
              <form style={{ padding: "15px 0" }} onSubmit={handleSubmit}>
                <TextField
                  id="outlined-basic"
                  label="Product_id"
                  variant="outlined"
                  className={classes.inputFeild}
                  value={productId}
                  onChange={(e) => {
                    setProductId(e.target.value);
                  }}
                  disabled={onEdit ? true : false}
                />
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  className={classes.inputFeild}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  className={classes.inputFeild}
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <FormControl variant="outlined" className={classes.inputFeild}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Category
                  </InputLabel>
                  <Select
                    native
                    label="Category"
                    inputProps={{
                      name: "category",
                      id: "outlined-category-native-simple",
                    }}
                    name="category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option aria-label="None" value="" />
                    {categories.map((category) => (
                      <option
                        key={category._id}
                        value={category.name}
                        style={{ textTransform: "capitalize" }}
                      >
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  className={classes.inputFeild}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Button type="submit" variant="contained" color="primary">
                  {onEdit ? "update" : "save"}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default EditProduct;
