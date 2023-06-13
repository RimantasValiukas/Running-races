import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {getRaces} from "../api/raceApi";
import {format, parseISO} from "date-fns";
import {NavLink, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const Races = (props) => {

    const [loading, setLoading] = useState(true);
    const [races, setRaces] = useState([]);
    const [message, setMessage] = useState({isVisible: false});
    const {t} = useTranslation('races');
    const {filterFunction, keyProp} = props;
    const user = useSelector(store => store.user.user)

    useEffect(() => {
        getRaces()
            .then(({data}) => {
                const filteredRaces = filterFunction(data);
                if (filteredRaces.length > 0) {
                    const sortedRaces = filteredRaces.sort((a, b) => {
                        const dateA = parseISO(a.dateTime);
                        const dateB = parseISO(b.dateTime);
                        return dateA - dateB;
                    });
                    setRaces(sortedRaces);
                } else {
                    setMessage({isVisible: true, message: t('noRaceMsg'), severity: 'info'})
                }
            })
            .catch((error) => console.log('error', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
            {
                loading ? <CircularProgress/> :
                    <>
                        <Typography variant="h5" sx={{mt: '90px'}}>{keyProp === 'upcoming' ? t('upcoming') : t('previous')}</Typography>
                        <Grid container spacing={4} sx={{mt: '5px'}}>
                            {races.map((race) => (
                                <Grid item key={race.name} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            backgroundColor: '#DBE2EF'
                                        }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                pt: '56.25%',
                                            }}
                                            image={race.imageURL}
                                        />
                                        <CardContent sx={{flexGrow: 1, color: '#112D4E'}}>
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
                                                    component={NavLink}
                                                    sx={{color: '#3F72AF'}}>{t('view')}</Button>
                                            {user?.roles.includes('ADMIN') && <Button size="small"
                                                     to={`/races/${race.id}/update`}
                                                     component={NavLink}
                                                     sx={{color: '#3F72AF'}}>{t('edit')}</Button>}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </>
            }
        </>
    );
}

export default Races;