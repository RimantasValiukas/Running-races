import {Alert, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getComments} from "../api/raceApi";
import {useParams} from "react-router-dom";
import {format, parseISO} from "date-fns";
import {useTranslation} from "react-i18next";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const {t} = useTranslation('comment');

    useEffect(() => {
        getComments(raceId)
            .then(({data}) => {
                if (data.length > 0) {
                    setComments(data);
                } else {
                    setMessage({isVisible: true, message: t('noComments'), severity: 'info'})
                }
            })
            .catch((error) => console.log('error', error))
            .finally(() => setLoading(false))
    }, [comments]);


    return (
        <Grid container spacing={2}>
            {message.isVisible ? <Alert severity='info'>{message.message}</Alert> :
                (comments.map((comment, index) => (
                        <Grid item xs={12} key={index}>
                            <Paper elevation={2} sx={{p: 2, backgroundColor: '#F9F7F7'}}>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {comment.userFullName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {format(parseISO(comment.dateTime), 'yyyy-MM-dd HH:mm')}
                                </Typography>
                                <Typography variant="body1" sx={{mt: 1, textAlign: 'justify'}}>
                                    {comment.comment}
                                </Typography>
                            </Paper>
                        </Grid>
                    )))
            }
        </Grid>
    );
}

export default Comments;