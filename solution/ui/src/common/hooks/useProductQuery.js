import { useQuery } from "react-query";

const DEMO_QUERY_ROUTE = "http://localhost:3000/products";

function useProductQuery() {
  return useQuery(
    "products",
    () => fetch(DEMO_QUERY_ROUTE).then((res) => res.json()),
    {
      select: (data) => {
        return data.map((product) => {
          return {
            ...product,
            state: product.units_in_stock < 3 ? "warning" : undefined,
          };
        });
      },
    }
  );
}

export default useProductQuery;
