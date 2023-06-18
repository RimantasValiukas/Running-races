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
import {getCompetitorsByRaceId} from "../api/raceApi";
import {NavLink, useParams} from "react-router-dom";
import {Alert, Button, CircularProgress, Link} from "@mui/material";
import {format, parseISO} from "date-fns";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export default function Competitors(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const [rows, setRows] = useState([]);
    const {t} = useTranslation('competitors');
    const user = useSelector(state => state.user.user);
    const {keyProp} = props;

    const getColumns = () => {
        const runnersColumns = [
            {id: 'name', label: t('name'), minWidth: 150},
            {id: 'dateOfBirth', label: t('dateOfBirth'), minWidth: 150},
            {id: 'city', label: t('city'), minWidth: 150},
            {id: 'club', label: t('club'), minWidth: 150},
            {id: 'distance', label: t('distance'), minWidth: 100},

        ];
        const resultsColumns = [
            {id: 'name', label: t('name'), minWidth: 150},
            {id: 'dateOfBirth', label: t('dateOfBirth'), minWidth: 150},
            {id: 'city', label: t('city'), minWidth: 150},
            {id: 'club', label: t('club'), minWidth: 150},
            {id: 'distance', label: t('distance'), minWidth: 100},
            {id: 'result', label: t('result'), minWidth: 150},
        ];

        if (user && user.roles.includes('ADMIN') && keyProp === "results") {
            resultsColumns.push({id: 'button', minWidth: 150})
        }

        if (keyProp === "results") {
            return resultsColumns;
        } else {
            return runnersColumns;
        }
    }

    const columns = getColumns();

    useEffect(() => {
        getCompetitorsByRaceId(raceId)
            .then(({data}) => {
                if (data.length > 0) {
                    const sortedCompetitors = data.sort((a, b) => a.result - b.result);
                    setCompetitors(sortedCompetitors);
                } else {
                    setMessage({isVisible: true, message: t('noCompetitorsMessage'), severity: 'info'})
                }
            })
            .catch((error) => {
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'});
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (keyProp === "results") {
            createDataForResults();
        } else {
            createDataForCompetitors();
        }
    }, [competitors]);

    const createDataForCompetitors = () => {
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

    const parseResult = (result) => {
        if (result) {
            return format(parseISO(result), 'HH:mm:ss');
        } else {
            return t('noResult');
        }
    }

    const createDataForResults = () => {
        const rowsData = [];
        competitors.map((competitor, index) => {
            const name = `${competitor.name} ${competitor.surname}`;
            const dateOfBirth = format(parseISO(competitor.dateOfBirth), 'yyyy-MM-dd');
            const city = competitor.city;
            const club = competitor.club;
            const distance = competitor.distance;
            const result = parseResult(competitor.result);
            const button = (
                <Button
                    size="small"
                    to={`/competitors/${raceId}/${competitor.id}/result`}
                    component={NavLink}
                    sx={{color: '#3F72AF'}}
                >
                    {t('addResult')}
                </Button>);
            if (user && user.roles.includes('ADMIN')) {
                rowsData.push({name, dateOfBirth, city, club, distance, result, button})

            } else {
                rowsData.push({name, dateOfBirth, city, club, distance, result})
            }
        })

        const sortedRows = rowsData.sort((a, b) => new Date(`1970-01-01T${a.result}`) - new Date(`1970-01-01T${b.result}`));
        setRows(sortedRows);
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
            {message.isVisible ? <Alert severity={message.severity} sx={{mt: '90px'}}>{message.message}</Alert> :
                loading ? <CircularProgress/> :
                    <>
                        <Typography variant="h5" sx={{mt: '90px'}}>{keyProp === 'results' ? t('raceResults') : t('title')}</Typography>
                        <Paper sx={{width: '100%', overflow: 'hidden', mt: '20px'}}>
                            <TableContainer sx={{maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{minWidth: column.minWidth}}
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
                                labelRowsPerPage={t('rows')}
                            />
                        </Paper>
                    </>
            }
        </>
    );
}