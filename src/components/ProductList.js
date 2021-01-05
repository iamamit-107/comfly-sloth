import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();

  if (filtered_products.length < 1) {
    return <h2>Sorry, no products found</h2>;
  }

  if (grid_view === false) {
    return <ListView products={filtered_products} />;
  }

  return <GridView products={filtered_products}>Products List</GridView>;
};

export default ProductList;
