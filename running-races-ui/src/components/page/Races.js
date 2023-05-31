import {Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getRaces} from "../api/raceApi";
import {format, parseISO} from "date-fns";
import {NavLink} from "react-router-dom";

const Races = () => {

    const [loading, setLoading] = useState(true);
    const [races, setRaces] = useState([]);

    useEffect(() => {
        getRaces()
            .then(({data}) => setRaces(data))
            .catch((error) => console.log('error', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <Grid container spacing={4} sx={{marginTop: '20px'}}>
                        {races.map((race) => (
                            <Grid item key={race} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://images.pexels.com/photos/1072705/pexels-photo-1072705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {race.name}
                                        </Typography>
                                        <Typography>
                                            {format(parseISO(race.dateTime), 'yyyy-MM-dd hh:mm')}
                                        </Typography>
                                        <Typography>
                                            {race.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small"
                                                to={`/races/${race.id}`}
                                                component={NavLink}>View</Button>
                                        <Button size="small"
                                                to={`/races/${race.id}/update`}
                                                component={NavLink}>Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
            }

        </>
    );
}

export default Races;