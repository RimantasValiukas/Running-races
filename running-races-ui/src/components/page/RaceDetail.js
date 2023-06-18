import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRaceById} from "../api/raceApi";
import {Alert, Button, CircularProgress, Grid, ImageListItem, Paper, styled, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {format, parseISO} from "date-fns";
import DeleteRace from "../DeleteRace";
import Competitor from "../forms/Competitor";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RaceDetail = () => {

    const {raceId} = useParams();
    const [loading, setLoading] = useState(true);
    const [race, setRace] = useState({});
    const [message, setMessage] = useState({isVisible: false});
    const {t} = useTranslation('raceDetail');
    const user = useSelector(store => store.user.user);
    const isRaceDayPassed = new Date() < new Date(race.dateTime);

    useEffect(() => {
        getRaceById(raceId)
            .then(({data}) => setRace(data))
            .catch((error) => setMessage({isVisible: true, message: 'Race cannot be opened', severity: 'error'}))
            .finally(() => setLoading(false));
    }, [])

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <Container maxWidth="lg" sx={{marginTop: '90px'}}>
                        {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <ImageListItem>
                                    <img
                                        src={race.imageURL ? race.imageURL : 'https://as2.ftcdn.net/v2/jpg/00/38/13/73/1000_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg'}/>
                                </ImageListItem>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Typography variant="h5" align="center">{race.name}</Typography>
                                <Typography>
                                    <Grid container spacing={2} sx={{mt: 2, ml: 1}}>
                                        <Grid item xs={4} sm={3}>{t('organizer')}</Grid>
                                        <Grid item xs={8} sm={9}>{race.organizer}</Grid>
                                        <Grid item xs={4} sm={3}>{t('dateTime')}</Grid>
                                        <Grid item xs={8}
                                              sm={9}>{format(parseISO(race.dateTime), 'yyyy-MM-dd HH:mm')} </Grid>
                                        <Grid item xs={4} sm={3}>{t('address')}</Grid>
                                        <Grid item xs={8} sm={9}>{race.address}</Grid>
                                        <Grid item xs={4} sm={3}>{t('description')}</Grid>
                                        <Grid item xs={8} sm={9} sx={{textAlign: 'justify'}}>{race.description}</Grid>
                                        <Grid item xs={12}>
                                            {isRaceDayPassed && <Button size="small"
                                                                        to={`/competitors/${race.id}/create`}
                                                                        component={NavLink}
                                                                        sx={{color: '#3F72AF'}}>{t('register')}</Button>}
                                            {!isRaceDayPassed ? <Button size="small"
                                                                        to={`/competitors/${race.id}/results`}
                                                                        component={NavLink}
                                                                        sx={{color: '#3F72AF'}}>{t('results')}</Button> :
                                                <Button size="small"
                                                        to={`/competitors/${race.id}`}
                                                        component={NavLink}
                                                        sx={{color: '#3F72AF'}}>{t('competitors')}</Button>}
                                            {user?.roles.includes('ADMIN') && <Button size="small"
                                                                                      to={`/races/${race.id}/update`}
                                                                                      component={NavLink}
                                                                                      sx={{color: '#3F72AF'}}>{t('edit')}</Button>}
                                            {user?.roles.includes('ADMIN') && <DeleteRace raceId={raceId}/>}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
            }
        </>
    );
}

export default RaceDetail;