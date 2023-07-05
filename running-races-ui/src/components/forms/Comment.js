import {useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import * as Yup from 'yup';
import store from "../../store/store";
import {Form, Formik} from "formik";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import FormInputs from "./FormInputs";
import {createComment} from "../api/raceApi";

const Comment = () => {

    const [loading, setLoading] = useState(true);
    const {raceId} = useParams();
    const user = useSelector(store => store.user.user);
    const [comment, setComment] = useState({
        raceId: '',
        userId: '',
        comment: '',
        dateTime: null
    });

    const commentValidationScheme = Yup.object().shape(
        {
            comment: Yup.string().required('Comment is required').max(1000, 'Maximum comment size 1000 symbols')
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
                                    label={'Add comment here'}
                                    rows={3}
                                    multiline/>
                        <Typography sx={{textAlign: 'right', mt: 2}}>
                            {
                                props.isSubmitting ? <CircularProgress/> :
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        sx={{color: '#3F72AF'}}>
                                        Add Comment
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