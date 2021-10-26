import {
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0",
  },
  paper: {
    padding: "10px",
  },
  formControl: {
    minWidth: "100%",
  },
}));

function Filters() {
  const classes = useStyles();
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.category;

  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xl={2} lg={2} md={2} xs={12} className={classes.paper}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Category
            </InputLabel>
            <Select
              native
              label="Category"
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple",
              }}
              name="category"
              value={category}
              onChange={handleCategory}
            >
              <option aria-label="None" value="" />
              {categories.map((category) => (
                <option key={category._id} value={"category=" + category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={8} md={8} xs={12} className={classes.paper}>
          <TextField
            margin="normal"
            variant="outlined"
            className={classes.formControl}
            style={{ marginTop: "0px" }}
            type="text"
            value={search}
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </Grid>
        <Grid item xl={2} md={2} lg={2} xs={12} className={classes.paper}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Sort by
            </InputLabel>
            <Select
              native
              label="Sort by"
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple",
              }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="" />
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best sales</option>
              <option value="sort=-price">Price: Hight-Low</option>
              <option value="sort=price">Price: Low-Hight</option>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default Filters;
