import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import * as Yup from 'yup';
import store from "../../store/store";
import {Form, Formik} from "formik";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import FormInputs from "./FormInputs";
import {createComment, getCommentById, updateComment} from "../api/raceApi";
import {useTranslation} from "react-i18next";

const Comment = ({commentId}) => {

    const [loading, setLoading] = useState(true);
    const {raceId} = useParams();
    const user = useSelector(store => store.user.user);
    const {t} = useTranslation('comment');
    const navigation = useNavigate();
    const [comment, setComment] = useState({
        raceId: '',
        userId: '',
        userFullName: '',
        comment: '',
        dateTime: null
    });

    const commentValidationScheme = Yup.object().shape(
        {
            comment: Yup.string().required(t('validation.required')).max(1000, t('validation.size'))
        }
    );

    useEffect(() => {
        if (!commentId) {
            setLoading(false)
            console.log(commentId)
            return;
        }

        getCommentById(commentId)
            .then(({data}) => {
                setComment(data)
                console.log(data)
            })
            .catch((error) => console.log('error', error))
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = (values, helper) => {
        if (commentId) {
            onEditComment(values, helper);
        } else {
            onCreateComment(values, helper);
        }
    }

    const onCreateComment = (values, helper) => {
        const currentTime = new Date();
        const updatedComment = {
            ...values,
            raceId: raceId,
            userId: user.userId,
            userFullName: user.fullName,
            dateTime: currentTime
        };

        createComment(updatedComment)
            .then(() => helper.resetForm())
            .catch((error) => console.log('error', error))
            .finally(() => helper.setSubmitting(false))
    }

    const onEditComment = (values, helper) => {
        updateComment(values, commentId)
            .then(() => navigation(`/races/${raceId}`))
            .catch((error) => console.log('error', error))
            .finally(() => helper.setSubmitting(false));
    }

    return (
        <>
            {
                loading ? <CircularProgress/> :
                    <Formik
                        initialValues={comment}
                        onSubmit={onSubmit}
                        validationSchema={commentValidationScheme}>
                        {props => (
                            <Form>
                                <Stack spacing={2} direction="column" sx={{mt: 2}}>
                                    <FormInputs error={props.touched.comment && !!props.errors.comment}
                                                name="comment"
                                                label={t('label')}
                                                rows={3}
                                                multiline/>
                                    <Typography sx={{textAlign: 'right', mt: 2}}>
                                        {
                                            props.isSubmitting ? <CircularProgress/> :
                                                <Button
                                                    variant="outlined"
                                                    type="submit"
                                                    sx={{color: '#3F72AF'}}>
                                                    {!commentId ? t('buttonCreate') : t('buttonEdit')}
                                                </Button>
                                        }
                                    </Typography>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
            }
        </>
    );
}

export default Comment;

