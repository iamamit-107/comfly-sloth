import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];

      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-heighest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return { ...state, filtered_products: tempProducts };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS:
      let { all_products } = state;
      let { text, category, company, price, color, shipping } = state.filters;

      let tempoProducts = [...all_products];

      if (text) {
        tempoProducts = tempoProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (shipping) {
        tempoProducts = tempoProducts.filter(
          (product) => product.shipping === shipping
        );
      }
      if (company !== "all") {
        tempoProducts = tempoProducts.filter(
          (product) => product.company === company
        );
      }
      if (category !== "all") {
        tempoProducts = tempoProducts.filter(
          (product) => product.category === category
        );
      }
      if (color !== "all") {
        tempoProducts = tempoProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      tempoProducts = tempoProducts.filter((p) => p.price <= price);

      return { ...state, filtered_products: tempoProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          color: "all",
          category: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      return state;
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
