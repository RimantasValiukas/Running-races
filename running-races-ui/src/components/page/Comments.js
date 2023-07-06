import {Alert, Button, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {deleteComment, getComments} from "../api/raceApi";
import {NavLink, useParams} from "react-router-dom";
import {format, parseISO} from "date-fns";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Comment from "../forms/Comment";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const {t} = useTranslation('comment');
    const user = useSelector(state => state.user.user);

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

    const onDelete = (commentId) => {
        deleteComment(commentId)
            .then()
            .catch((error) => console.log('error', error))
    }

    const onEdit = (commentId) => {
        setEditCommentId(commentId);
    }


    return (
        <Grid container spacing={2}>
            {message.isVisible ? <Alert severity='info'>{message.message}</Alert> :
                (comments.map((comment, index) => (
                    (editCommentId === comment.commentId ?
                        <Grid item xs={12} key={index}>
                            <Comment commentId={comment.commentId}/>
                        </Grid> :
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
                                {((user?.userId === comment.userId) || user?.roles.includes('ADMIN')) &&
                                    <Grid item xs={12}>
                                        <Button size="small"
                                                color='warning'
                                                onClick={() => onDelete(comment.commentId)}>
                                            {t('delete')}
                                        </Button>
                                        <Button size="small"
                                                sx={{color: '#3F72AF'}}
                                                onClick={() => onEdit(comment.commentId)}>
                                            {t('edit')}
                                        </Button>
                                    </Grid>}
                            </Paper>
                        </Grid>)
                )))
            }
        </Grid>
    );
}

export default Comments;