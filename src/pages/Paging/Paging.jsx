import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { fetchProjectList, paging } from "../Projects/ProjectApi";
import { Button, Checkbox, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Paging.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useLanguage } from "../../LanguageContext";
import { Link } from "react-router-dom";

function Pagging({ data, onDeleteRow }) {
  const { language, setLanguage, translations } = useLanguage();
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrderBy(cellId);
    setOrder(isAsc ? "desc" : "asc");
    switch (cellId) {
      case "id":
        if (isAsc) {
          data.sort((a, b) => a.projectNumber - b.projectNumber);
        } else {
          data.sort((a, b) => b.projectNumber - a.projectNumber);
        }
        break;
      case "visa":
        if (isAsc) {
          data.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          data.sort((a, b) => b.name.localeCompare(a.name));
        }
        break;
      default:
        break;
    }
  };
  const handleClick = (params) => {
    if (!selectedRowIds.includes(params)) {
      setSelectedRowIds([...selectedRowIds, params]);
    } else {
      setSelectedRowIds(selectedRowIds.filter((ele) => ele != params));
    }
  };

  const handleDeleteSelected = () => {
    onDeleteRow(selectedRowIds);
    setSelectedRowIds([]);
  };

  return (
    <>
      <TableContainer className="table-container" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell className="col" align="center"></TableCell>
              <TableCell className="col" align="center">
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSortRequest("id")}
                >
                  Number
                </TableSortLabel>
              </TableCell>
              <TableCell className="col" align="center">
                <TableSortLabel
                  active={orderBy === "visa"}
                  direction={orderBy === "visa" ? order : "asc"}
                  onClick={() => handleSortRequest("visa")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell className="col" align="center">
                Status
              </TableCell>
              <TableCell className="col" align="center">
                Customer
              </TableCell>
              <TableCell className="col" align="center">
                Start Date
              </TableCell>
              <TableCell className="col" align="center">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="col" align="center">
                  {row.status === "NEW" ? (
                    <Checkbox
                      checked={selectedRowIds.includes(row.id)}
                      onChange={() => handleClick(row.id)}
                    />
                  ) : null}
                </TableCell>
                <TableCell className="col" align="center">
                  <Link
                    to={`/project/${row.id}`}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    {row.projectNumber}
                  </Link>
                </TableCell>
                <TableCell className="col" align="center">
                  {row.name}
                </TableCell>
                <TableCell className="col" align="center">
                  {row.status}
                </TableCell>
                <TableCell className="col" align="center">
                  {row.customer}
                </TableCell>
                <TableCell className="col" align="center">
                  {new Date(row.startDate).toLocaleDateString("en")}
                </TableCell>
                <TableCell className="col" align="center">
                  {row.status === "NEW" ? (
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      style={{ border: "none" }}
                      onClick={() => {
                        onDeleteRow([row.id]);
                      }}
                    >
                      {<DeleteIcon />}
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br/>
      {selectedRowIds.length > 0 && 
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={handleDeleteSelected}
        hidden={selectedRowIds.length === 0}
      >
        {translations[language].delete}
      </Button>
      }
    </>
  );
}

export default Pagging;
