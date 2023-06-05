import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {getCompetitors, getCompetitorsByRaceId} from "../api/raceApi";
import {useParams} from "react-router-dom";
import {Alert, CircularProgress} from "@mui/material";
import {format, parseISO} from "date-fns";

const columns = [
    { id: 'name', label: 'Name, Surname', minWidth: 170 },
    { id: 'dateOfBirth', label: 'Date of birth', minWidth: 170 },
    { id: 'city', label: 'City', minWidth: 170 },
    { id: 'club', label: 'Club', minWidth: 170 },
    { id: 'distance', label: 'Distance (km)', minWidth: 170 },
];

export default function Competitors() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getCompetitorsByRaceId(raceId)
            .then(({data}) => {
                if (data.length > 0) {
                    setCompetitors(data);
                } else {
                    setMessage({isVisible: true, message: 'There are no registered competitors yet', severity: 'info'})
                }
            })
            .catch((error) => {
                setMessage({isVisible: true, message: 'Something goes wrong', severity: 'error'});
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        createData();
    }, [competitors]);

    const createData = () => {
        const rowsData = [];
        competitors.map((competitor) => {
            const name = `${competitor.name} ${competitor.surname}`;
            const dateOfBirth = format(parseISO(competitor.dateOfBirth), 'yyyy-MM-dd');
            const city = competitor.city;
            const club = competitor.club;
            const distance = competitor.distance;
            rowsData.push({name, dateOfBirth, city, club, distance})
        })
        setRows(rowsData);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
            {
                loading ? <CircularProgress/> : <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2}}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            }

        </>

    );
}