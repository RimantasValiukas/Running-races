import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Button, CircularProgress} from "@mui/material";
import {Form, Formik} from "formik";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {LocalizationProvider, TimeField} from "@mui/x-date-pickers";
import {useNavigate, useParams} from "react-router-dom";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {getCompetitor, updateCompetitor} from "../api/raceApi";

const Result = () => {

    const {competitorId} = useParams();
    const [competitor, setCompetitor] = useState({});
    const [result, setResult] = useState({
        result: null
    });
    const [message, setMessage] = useState({isVisible: false});
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation('result');
    const navigation = useNavigate();

    useEffect(() => {
        getCompetitor(competitorId)
            .then(({data}) => {
                setCompetitor(data);
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({isVisible: true, message: t('errorMessage'), severity:'error'})
            })
            .finally(() => setLoading(false));
    }, [])

    const onAddResult = (values, helper) => {
        console.log(values.result)
        const timeResult = new Date(values.result);
        timeResult.setFullYear(1970,0,1);
        competitor.result = timeResult;

        updateCompetitor(competitor, competitorId)
            .then(() => {
                helper.resetForm();
                navigation(`/competitors/${competitor.raceId}`);
            })
            .catch((error) => {
                console.log('error', error);
                setMessage({isVisible: true, message: t('errorMessageTwo'), severity:'error'});
            })
            .finally(() => helper.setSubmitting(false))

    }

    return (
        <>
            <Formik
                    initialValues={result}
                    onSubmit={onAddResult}>

                    {props => (
                        <Container maxWidth="md" sx={{marginTop: '90px'}}>
                            <Form>
                                {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                                <Typography variant="h5" sx={{mb: '20px'}}>{t('addResult')}</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimeField
                                        value={props.values.result}
                                        onChange={(value) => props.setFieldValue("result", value)}
                                        ampm={false}
                                        label={t('result')}
                                        format="HH:mm:ss"/>
                                </LocalizationProvider>
                                <Typography sx={{textAlign: 'left', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                sx={{color: '#3F72AF'}}>
                                                {t('submit')}
                                            </Button>
                                    }
                                </Typography>
                            </Form>
                        </Container>
                    )}
                </Formik>
        </>
    );

}

export default Result;