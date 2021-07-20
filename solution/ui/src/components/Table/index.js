import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useTable } from "react-table";
import jss from "./table.jss";

const TableRowWrapper = ({ row }) => {
  const classes = jss(row.original );

  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <TableCell key={row.original.id} {...cell.getCellProps()} className={classes.row}>
            {cell.render("Cell")} {row.original.state}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

function TableWrapper({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell key={i} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return <TableRowWrapper key={i} row={row} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableWrapper;
