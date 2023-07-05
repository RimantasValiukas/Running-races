import {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import * as Yup from 'yup';
import store from "../../store/store";
import {Form, Formik} from "formik";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import FormInputs from "./FormInputs";
import {createComment} from "../api/raceApi";
import {useTranslation} from "react-i18next";

const Comment = () => {

    const [loading, setLoading] = useState(true);
    const {raceId} = useParams();
    const user = useSelector(store => store.user.user);
    const {t} = useTranslation('comment');
    const [comment, setComment] = useState({
        raceId: '',
        userId: '',
        comment: '',
        dateTime: null
    });

    const commentValidationScheme = Yup.object().shape(
        {
            comment: Yup.string().required(t('validation.required')).max(1000, t('validation.size'))
        }
    );

    const onCreateComment = (values, helper) => {
        const currentTime = new Date();
        const updatedComment = {
            ...values,
            raceId: raceId,
            userId: user.userId,
            dateTime: currentTime
        };

        createComment(updatedComment)
            .then(() => helper.resetForm())
            .catch((error) => console.log('error', error))
            .finally(() => helper.setSubmitting(false))
    }


    return (
        <Formik
            initialValues={comment}
            onSubmit={onCreateComment}
            validationSchema={commentValidationScheme}>
            {props => (
                <Form>
                    <Stack spacing={2} direction="column">
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
                                        {t('button')}
                                    </Button>
                            }
                        </Typography>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
}

export default Comment;