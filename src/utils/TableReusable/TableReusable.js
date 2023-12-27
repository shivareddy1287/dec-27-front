import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const TableReusable = (props) => {
  return (
    <div>
      <Box>
        {" "}
        <Box
          // height="86vh"
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#ebebed",
              borderBottom: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#ebebed",
            },
          }}
        >
          <div style={{ height: "85vh", width: "100%" }}>
            <DataGrid
              rows={props.rows}
              columns={props.columns}
              slots={{ toolbar: GridToolbar }}
              hideFooterPagination={true}
              initialState={props.initialState}
            />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default TableReusable;
