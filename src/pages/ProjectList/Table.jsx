import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


const columns = [
  {
    field: "projectNumber",
    headerName: "Number",
    width: 90,
    renderCell: (params) => (
      <Link
        to={`/project/${params.row.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 350,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: false,
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 110,
    editable: false,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    editable: false,
    width: 160,
  },
  {
    field: 'delete',
    headerName: "Delete",
    type: "number",
    width: 110,
    editable: false,
  },
];

// const rows = [
//   {
//     id: 1,
//     projectNumber: 1231,
//     name: "Snow",
//     status: "NEW",
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: true,
//   },
//   {
//     id: 2,
//     projectNumber: 1232,
//     name: "Lannister",
//     status: "Cersei",
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: null,
//   },
//   {
//     id: 3,
//     projectNumber: 1233,
//     name: "Lannister",
//     status: "Jaime",
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: null,
//   },
//   {
//     id: 4,
//     projectNumber: 1234,
//     name: "Stark",
//     status: "Arya",
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: null,
//   },
//   {
//     id: 5,
//     projectNumber: 1235,
//     name: "Targaryen",
//     status: "NEW",
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: true,
//   },
//   {
//     id: 6,
//     projectNumber: 1236,
//     name: "Melisandre",
//     status: null,
//     customer: "GKB",
//     startDate: "21-11-2023",
//     delete: null,
//   },
//   {
//     id: 7,
//     projectNumber: 1237,
//     name: "Clifford",
//     status: "Ferrara",
//     customer: "GKB",
//     startDate: "21-11-2000",
//     delete: null,
//   },
//   {
//     id: 8,
//     projectNumber: 1238,
//     name: "Frances",
//     status: "Rossini",
//     customer: "GKB",
//     startDate: "21-11-2000",
//     delete: null,
//   },
//   {
//     id: 9,
//     projectNumber: 1239,
//     name: "Roxie",
//     status: "Harvey",
//     customer: "GKB",
//     startDate: "21-11-2000",
//     delete: null,
//   },
// ];

export default function DataGridDemo({data}) {
  return (
    
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
