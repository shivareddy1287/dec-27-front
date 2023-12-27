import React from "react";
import TableReusable from "./TableReusable";
import products from "../products";

const columns = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "NAME",
    width: 200,
  },
  {
    field: "description",
    headerName: "DESCRIPTION",
    width: 200,
    flex: 1,
  },
  {
    field: "brand",
    headerName: "BRAND",
    width: 100,
  },
  {
    field: "category",
    headerName: "CATEGORY",
  },
  {
    field: "price",
    headerName: "PRICE",
  },
  {
    field: "countInStock",
    headerName: "COUNTINSTOCK",

    headerAlign: "left",
    align: "center",
  },
  {
    field: "rating",
    headerName: "RATING",
  },
];
const MainTable = () => {
  return (
    <div style={{ height: 450, width: "100%" }}>
      <TableReusable columns={columns} products={products} />
      <TableReusable columns={columns} products={products} />
    </div>
  );
};

export default MainTable;
