import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataGridDemo({ data, onDeleteRow }) {
  const { language, setLanguage, translations } = useLanguage();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const isRowSelectable = (params) => {
    return params.row.status === "NEW";
   
  };
  console.log(rowSelectionModel);

  const handleDeleteSelected = () => {
    console.log("Deleting selected rows:", rowSelectionModel);
    onDeleteRow(rowSelectionModel);
    setSelectedRows([]);
  };
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
      width: 300,
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
      width: 150,
      editable: false,
    },
    {
      field: "startDate",
      headerName: `${translations[language].startDate}`,
      editable: false,
      width: 160,
      renderCell: (params) => {
        const startDateValue = new Date(params.value);
        const formattedDate = startDateValue.toLocaleDateString(language);

        return formattedDate;
      },
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
            size="small"
            color="error"
            style={{ border: "none" }}
            onClick={() => {
              onDeleteRow([params.row.id]);
            }}
          >
            {<DeleteIcon />}
          </Button>
        ) : null,
    },
  ];
  console.log("cc");
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        selectionModel={selectedRows}
        isRowSelectable={isRowSelectable}
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
      <br/>
      {/* Nút "Delete Selected" để xóa các dòng đã chọn */}
      <Button
        variant="outlined"
        size="small"
        color="error"
        // style={{ margin: "10px 0", border: "none" }}
        onClick={handleDeleteSelected}
        disabled={rowSelectionModel.length === 0}
      >
        Delete Selected
      </Button>
    </Box>
  );
}
