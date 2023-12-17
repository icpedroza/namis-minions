// SimpleTable.js defines a static, non-paginated table component for displaying query results.

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";

export default function SimpleTable({ title, route, columns, pageSize }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${route}?page_size=${pageSize}`)
            .then(res => res.json())
            .then(resJson => setData(resJson));
    }, []);

    const defaultRenderCell = (col, row) => {
        return <Typography>{row[col.field]}</Typography>;
    }

    return (
        <TableContainer>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map(col =>
                            <TableCell key={col.headerName}>
                                <Typography fontWeight="bold">{col.headerName}</Typography>
                            </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, idx) =>
                        <TableRow key={idx}>
                            {
                                columns.map(col =>
                                    <TableCell key={col.headerName}>
                                        {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                                    </TableCell>)
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}