import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { fetchProjectList, paging } from "../Projects/ProjectApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

function Pagging() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  console.log(page);
  console.log(rowsPerPage);
  console.log(count);

  useEffect(() => {
    const fetchData = async () => {
      const response = await paging(page, rowsPerPage);

      setCount(response.totalItems);
      setRows(response.data);
      console.log("dsfjakl", response.data);
    };
    fetchData();
  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrderBy(cellId);
    setOrder(isAsc ? "desc" : "asc");
    switch (cellId) {
        case "id":
          if (isAsc) {
            rows.sort((a, b) => a.id - b.id);
          } else {
            rows.sort((a, b) => b.id - a.id);
          }
          break;
        case "visa":
          if (isAsc) {
            rows.sort((a, b) => a.visa.localeCompare(b.visa));
          } else {
            rows.sort((a, b) => b.visa.localeCompare(a.visa));
          }
          break;
        // Thêm các trường sắp xếp khác nếu cần
        default:
          break;
      }
  };

  console.log(order);
  console.log(orderBy);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ textAlign: "center", borderRight: "1px solid lightgray" }}
                align="center"
              >
                <TableSortLabel
                  style={{ textAlign: "center" }}
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleSortRequest("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  style={{ textAlign: "center" }}
                  active={orderBy === "visa"}
                  direction={orderBy === "visa" ? order : "asc"}
                  onClick={() => handleSortRequest("visa")}
                >
                  Visa
                </TableSortLabel>
              </TableCell>
              <TableCell  align="left">FirstName</TableCell>
              <TableCell align="left">LastName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell  style={{ textAlign: "center", borderRight: "1px solid lightgray" }}  align="left">{row.id}</TableCell>
                <TableCell align="left">{row.visa}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10,20]}
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default Pagging;
