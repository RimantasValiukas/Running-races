import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRaceById} from "../api/raceApi";
import {Alert, Button, CircularProgress, Grid, ImageListItem, Paper, styled, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {format, parseISO} from "date-fns";
import DeleteRace from "../DeleteRace";

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

    useEffect(() => {
        getRaceById(raceId)
            .then(({data}) => setRace(data))
            .catch((error) => setMessage({isVisible: true, message: 'Race cannot be opened', severity:'error'}))
            .finally(() => setLoading(false));
    })

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <Container maxWidth="lg" sx={{marginTop: '20px'}}>
                        {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <ImageListItem>
                                    <img
                                        src={race.imageURL}/>
                                </ImageListItem>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="h5" align="center">{race.name}</Typography>
                                <Grid container spacing={2} sx={{mt: 2, ml: 1}}>
                                    <Grid item xs={2}>Organizer:</Grid>
                                    <Grid item xs={10}>{race.organizer}</Grid>
                                    <Grid item xs={2}>Date and time:</Grid>
                                    <Grid item xs={10}>{format(parseISO(race.dateTime), 'yyyy-MM-dd hh:mm')}</Grid>
                                    <Grid item xs={2}>Address:</Grid>
                                    <Grid item xs={10}>{race.address}</Grid>
                                    <Grid item xs={2}>Description:</Grid>
                                    <Grid item xs={10}>{race.description}</Grid>
                                    <Grid item xs={12}> <Button size="small"
                                                                to={`#`}
                                                                component={NavLink}>Register</Button>
                                        <Button size="small"
                                                to={`/races/${race.id}/update`}
                                                component={NavLink}>Edit</Button>
                                        <DeleteRace raceId={raceId}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

            }
        </>
    );
}

export default RaceDetail;