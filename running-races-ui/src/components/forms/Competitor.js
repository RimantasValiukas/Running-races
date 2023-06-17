import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Yup from "yup";
import {createCompetitor, getRaceById} from "../api/raceApi";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack, TextField
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormInputs from "./FormInputs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {parseISO} from "date-fns";

const Competitor = () => {

    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const [distances, setDistances] = useState([]);
    const [loading, setLoading] = useState(true);
    const {t} = useTranslation('competitor');
    const user = useSelector(store => store.user.user);
    const [competitor, setCompetitor] = useState({
        name: '',
        surname: '',
        dateOfBirth: null,
        city: '',
        club: '',
        distance: '',
        raceId: '',
        userId: ''
    });

    const competitorValidationScheme = Yup.object().shape(
        {
            name: Yup.string().required(t('nameRequired')),
            surname: Yup.string().required(t('surnameRequired')),
            dateOfBirth: Yup.date().required(t('dateOfBirthRequired')),
            city: Yup.string().required(t('cityRequired')),
            distance: Yup.number().required(t('distanceRequired'))
        });

    useEffect(() => {
        if (user) {
            const userData = {
                ...competitor,
                name: user.name,
                surname: user.surname,
                dateOfBirth: parseISO(user.dateOfBirth)
            }
            setCompetitor(userData);
        }

        getRaceById(raceId)
            .then(({data}) => setDistances(data.distances))
            .catch((error) => {
                setMessage({isVisible: true, message: t('cantFind'), severity: 'error'});
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [])

    const onRegisterCompetitor = (values, helper) => {
        const timestamp = new Date(values.dateOfBirth).getTime();
        let userId = null;
        if(user) {
            userId = user.userId;
        }
        const updatedValues = {
            ...values,
            dateOfBirth: timestamp,
            raceId: raceId,
            userId: userId
        };

        createCompetitor(updatedValues)
            .then(() => {
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
                    initialValues={competitor}
                    onSubmit={onRegisterCompetitor}
                    validationSchema={competitorValidationScheme}
                >
                    {props => (
                        <Container maxWidth="md" sx={{marginTop: '90px'}}>
                            <Form>
                                <Stack spacing={2} direction="column">
                                    {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                                    <Typography variant="h5">{t('titleRegister')}</Typography>
                                    <FormInputs error={props.touched.name && !!props.errors.name}
                                                name="name"
                                                label={t('name')}/>
                                    <FormInputs error={props.touched.surname && !!props.errors.surname}
                                                name="surname"
                                                label={t('surname')}/>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label={t('dateOfBirth')}
                                            value={props.values.dateOfBirth}
                                            onChange={(value) => props.setFieldValue("dateOfBirth", value)}
                                            format="yyyy-MM-dd"
                                            onBlur={props.handleBlur("dateOfBirth")}
                                            error={props.touched.dateOfBirth && !!props.errors.dateOfBirth}
                                        />
                                        <ErrorMessage name="dateOfBirth" component={FormHelperText}/>
                                    </LocalizationProvider>

                                    <FormInputs error={props.touched.city && !!props.errors.city}
                                                name="city"
                                                label={t('city')}/>
                                    <FormInputs error={props.touched.club && !!props.errors.club}
                                                name="club"
                                                label={t('club')}/>

                                    <FormControl fullWidth>
                                        <InputLabel>{t('distance')}</InputLabel>
                                        <Field
                                            as={Select}
                                            value={props.values.distance}
                                            id="distance"
                                            name="distance"
                                            error={props.touched.distance && !!props.errors.distance}>
                                            {
                                                distances.map((d) => (
                                                    <MenuItem key={d} value={d}
                                                              selected={competitor.distance === d}>{d}</MenuItem>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage name="distance" component={FormHelperText}/>
                                    </FormControl>

                                    <Typography sx={{textAlign: 'center', mt: 2}}>
                                        {
                                            props.isSubmitting ? <CircularProgress/> :
                                                <Button variant="outlined" type="submit">{t('btnRegister')}</Button>
                                        }
                                    </Typography>
                                </Stack>
                            </Form>
                        </Container>
                    )}
                </Formik>
            }
        </>

    )
        ;
}

export default Competitor;