import {createRace, getRaceById, updateRace} from "../api/raceApi";
import {ErrorMessage, FieldArray, Form, Formik} from "formik";
import {Alert, Button, CircularProgress, FormHelperText, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormInputs from "./FormInputs";
import Container from "@mui/material/Container";
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {parseISO} from "date-fns";
import {useTranslation} from "react-i18next";

const Race = () => {

    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();
    const [race, setRace] = useState({
        name: '',
        address: '',
        description: '',
        organizer: '',
        imageURL: '',
        dateTime: null,
        distances: []
    });
    const {t} = useTranslation('race');

    const raceValidationScheme = Yup.object().shape(
        {
            name: Yup.string().required(t('validation.name')),
            address: Yup.string().required(t('validation.address')),
            description: Yup.string().required(t('validation.description')),
            organizer: Yup.string().required(t('validation.organizer')),
            dateTime: Yup.date().required(t('validation.dateTime')),
            distances: Yup.array()
                .of(Yup.number().min(0.1, t('validation.distances.minValue')).required(t('validation.distances.required')))
                .min(1, t('validation.distances.minArrayLength')).typeError(t('validation.distances.typeError'))
        });

    useEffect(() => {
        if (!raceId) {
            setLoading(false);

            return;
        }

        getRaceById(raceId)
            .then(({data}) => {
                const parsedDate = parseISO(data.dateTime);
                data.dateTime = parsedDate;
                setRace(data)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const onFormSubmit = (values, helper) => {
        if (raceId) {
            onRaceUpdate(values, helper);
        }

        onCreateRace(values, helper);
    }

    const onRaceUpdate = (values, helper) => {
        updateRace(values, raceId)
            .then(() => navigation(`/races/${raceId}`))
            .catch((error) => setMessage({isVisible: true, message: t('errorMessage'), severity:'error'}))
            .finally(() => helper.setSubmitting(false));
    }

    const onCreateRace = (values, helper) => {
        const timestamp = new Date(values.dateTime).getTime();
        const updatedValues = {
            ...values,
            dateTime: timestamp,
        };

        createRace(updatedValues)
            .then((response) => {
                helper.resetForm();
                setMessage({isVisible: true, message: t('successMessage'), severity: 'success'});
            })
            .catch((error) => {
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }

    return (
        <>
        {
            loading ? <CircularProgress/> : <Formik
                initialValues={race}
                onSubmit={onFormSubmit}
                validationSchema={raceValidationScheme}
            >

                {props => (
                    <Container maxWidth="md" sx={{marginTop: '90px'}}>
                        <Form>
                            <Stack spacing={2} direction="column">
                                {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                                <Typography variant="h5">{raceId ? t('titleUpdate') : t('titleCreate')}</Typography>
                                <FormInputs error={props.touched.name && !!props.errors.name}
                                            name="name"
                                            label={t('name')}/>
                                <FormInputs error={props.touched.address && !!props.errors.address}
                                            name="address"
                                            label={t('address')}/>
                                <FormInputs error={props.touched.description && !!props.errors.description}
                                            name="description"
                                            label={t('description')}
                                            rows={3}
                                            multiline/>
                                <FormInputs error={props.touched.organizer && !!props.errors.organizer}
                                            name="organizer"
                                            label={t('organizer')}/>
                                <FormInputs error={props.touched.imageURL && !!props.errors.imageURL}
                                            name="imageURL"
                                            label={t('image')}/>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label={t('dateTime')}
                                        value={props.values.dateTime}
                                        onChange={(value) => props.setFieldValue("dateTime", value)}
                                        format="yyyy-MM-dd HH:mm:ss"
                                        onBlur={props.handleBlur("dateTime")}
                                        error={props.touched.dateTime && !!props.errors.dateTime}
                                    />
                                    <ErrorMessage name="dateTime" component={FormHelperText}/>
                                </LocalizationProvider>

                                <FieldArray name="distances">
                                    {(arrayHelpers) => (
                                        <>
                                            {props.values.distances.map((distance, index) => (
                                                <FormInputs
                                                    key={index}
                                                    name={`distances[${index}]`}
                                                    label={t('distance')}
                                                    type="number"
                                                    error={props.touched.distances && !!props.errors.distances?.[index]}
                                                />
                                            ))}
                                            <Typography sx={{textAlign: 'left', mt: 2}}>
                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    onClick={() => arrayHelpers.push('')}
                                                >
                                                    {t('btnAddDistance')}
                                                </Button>
                                            </Typography>
                                        </>
                                    )}
                                </FieldArray>
                                <Typography sx={{textAlign: 'center', mt: 2}}>
                                    {
                                        props.isSubmitting ? <CircularProgress/> :
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                sx={{color: '#3F72AF'}}>
                                                {raceId ? t('btnUpdate') : t('btnCreate')}
                                            </Button>
                                    }
                                </Typography>
                            </Stack>
                        </Form>
                    </Container>
                )}
            </Formik>
        }

        </>
    );
}

export default Race;
