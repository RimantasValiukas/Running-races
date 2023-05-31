import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRaceById} from "../api/raceApi";
import {Button, CircularProgress, Grid, ImageListItem, Paper, styled, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {format, parseISO} from "date-fns";

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

    useEffect(() => {
        getRaceById(raceId)
            .then(({data}) => setRace(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    })

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <Container maxWidth="lg" sx={{marginTop: '20px'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <ImageListItem>
                                    <img
                                        src="https://images.pexels.com/photos/1072705/pexels-photo-1072705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
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
                                        <Button size="small"
                                                color='warning'
                                                to={`#`}
                                                component={NavLink}>Delete</Button>
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