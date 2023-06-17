import {Alert, Button, CircularProgress, Grid, ImageListItem, Paper, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {format, parseISO} from "date-fns";
import {NavLink, useParams} from "react-router-dom";
import DeleteRace from "../DeleteRace";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getCompetitorsByUserId} from "../api/userApi";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {getRaces} from "../api/raceApi";

const UserDetail = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({isVisible: false});
    const [competitors, setCompetitors] = useState([]);
    const [races, setRaces] = useState([]);
    const [rows, setRows] = useState([]);
    const {t} = useTranslation('userDetail');
    const user = useSelector(store => store.user.user);


    useEffect(() => {
        getCompetitorsByUserId(user.userId)
            .then(({data}) => {
                setCompetitors(data);
            })
            .catch((error) => {
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'})
            })
            .finally()
            }, []);

    useEffect(() => {
        getRaces()
            .then(({data}) => {
                setRaces(data);
            })
            .catch((error) => {
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'})
            })
            .finally()
    }, [competitors])

    useEffect(() => {
        createData();
        setLoading(false);
    }, [races]);

    const getRaceById = (raceId) => {
        return races.find(race => race.id === raceId);
    }

    const parseResult = (result) => {
        if (result) {
            return format(parseISO(result), 'HH:mm:ss');
        } else {
            return t('noResult');
        }
    }

    const createData = () => {
        const rowsData = competitors.map((competitor) => {
            const race = getRaceById(competitor.raceId);
            const raceName = race.name;
            const date = format(parseISO(race.dateTime), 'yyyy-MM-dd');
            const distance = competitor.distance;
            const result = parseResult(competitor.result);

            return { raceName, date, distance, result };
        });

        const sortedRows = rowsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRows(sortedRows);
    }


    return(
        <>
            {
                loading ? <CircularProgress sx={{mt: '90px'}}/> :
                    <Container maxWidth="lg" sx={{marginTop: '90px'}}>
                        {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Typography variant="h5" align="left">{t('information')} {user.fullName}</Typography>
                                <Grid container spacing={2} sx={{mt: 2, ml: 1}}>
                                    <Grid item xs={4} sm={3}>{t('name')}</Grid>
                                    <Grid item xs={8} sm={9}>{user.name}</Grid>
                                    <Grid item xs={4} sm={3}>{t('surname')}</Grid>
                                    <Grid item xs={8} sm={9}>{user.surname}</Grid>
                                    <Grid item xs={4} sm={3}>{t('email')}</Grid>
                                    <Grid item xs={8} sm={9}>{user.username}</Grid>
                                    <Grid item xs={4} sm={3}>{t('dateOfBirth')}</Grid>
                                    <Grid item xs={8} sm={9}>{format(parseISO(user.dateOfBirth), 'yyyy-MM-dd')}</Grid>
                                </Grid>
                                <Typography variant="h5" align="left" sx={{mt: '30px'}}>{t('races')}</Typography>
                                {rows ? <TableContainer component={Paper} sx={{mt: '30px'}}>
                                    <Table sx={{minWidth: 650}} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{t('raceName')}</TableCell>
                                                <TableCell align="right">{t('date')}</TableCell>
                                                <TableCell align="right">{t('distance')}</TableCell>
                                                <TableCell align="right">{t('result')}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.raceName}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.raceName}
                                                    </TableCell>
                                                    <TableCell align="right">{row.date}</TableCell>
                                                    <TableCell align="right">{row.distance}</TableCell>
                                                    <TableCell align="right">{row.result}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> :
                                    <Alert severity='info'>{t('message')}</Alert>}
                            </Grid>
                        </Grid>
                    </Container>
            }
        </>
    );
}

export default UserDetail;