import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import { GlobalState } from "../GlobalState";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;
  return (
    <div className="load_more">
      {result < page * 8 ? (
        ""
      ) : (
        <Button variant="outlined" onClick={() => setPage(page + 1)}>
          Load more
        </Button>
      )}
    </div>
  );
}

export default LoadMore;
