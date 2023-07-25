import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { Button } from "@mui/material";
import { useState } from "react";
import { deleteProject } from "../Projects/ProjectApi";
import { useNavigate } from "react-router-dom";

export default function DataGridDemo({ data, onDeleteRow  }) {
  const { language, setLanguage, translations } = useLanguage();
  const columns = [
    {
      field: "projectNumber",
      headerName: `${translations[language].number}`,
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
      headerName: `${translations[language].name}`,
      width: 350,
      editable: false,
    },
    {
      field: "status",
      headerName: `${translations[language].status}`,
      width: 150,
      editable: false,
    },
    {
      field: "customer",
      headerName: `${translations[language].customer}`,
      width: 110,
      editable: false,
    },
    {
      field: "startDate",
      headerName: `${translations[language].startDate}`,
      editable: false,
      width: 160,
    },
    {
      field: "delete",
      headerName: `${translations[language].delete}`,
      type: "number",
      width: 110,
      editable: false,
      renderCell: (params) =>
        params.row.status === "NEW" ? (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => onDeleteRow(params.row.id)}
          >
            DEL
          </Button>
        ) : null,
    },
  ];
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
