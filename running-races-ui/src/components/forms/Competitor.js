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

const competitorValidationScheme = Yup.object().shape(
    {
        name: Yup.string().required('Name is required'),
        surname: Yup.string().required('Surname is required'),
        dateOfBirth: Yup.date().required('Date of birth is required'),
        city: Yup.string().required('City is required'),
        distance: Yup.number().required('Distance is required')
    });

const Competitor = () => {

    const [message, setMessage] = useState({isVisible: false});
    const {raceId} = useParams();
    const [distances, setDistances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [competitor, setCompetitor] = useState({
        name: '',
        surname: '',
        dateOfBirth: null,
        city: '',
        club: '',
        distance: '',
        raceId: ''
    });

    useEffect(() => {
        getRaceById(raceId)
            .then(({data}) => setDistances(data.distances))
            .catch((error) => {
                setMessage({isVisible: true, message: 'Cannot find the race', severity: 'error'});
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [])

    const onRegisterCompetitor = (values, helper) => {
        const timestamp = new Date(values.dateOfBirth).getTime();
        const updatedValues = {
            ...values,
            dateOfBirth: timestamp,
            raceId: raceId,
        };

        createCompetitor(updatedValues)
            .then(() => {
                helper.resetForm();
                setMessage({isVisible: true, message: 'You have successfully registered', severity: 'success'});
            })
            .catch((error) => {
                setMessage({isVisible: true, message: 'Something goes wrong', severity: 'error'});
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
                                    <Typography variant="h5">Register for the race</Typography>
                                    <FormInputs error={props.touched.name && !!props.errors.name}
                                                name="name"
                                                label="Name"/>
                                    <FormInputs error={props.touched.surname && !!props.errors.surname}
                                                name="surname"
                                                label="Surname"/>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date of birth"
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
                                                label="City"/>
                                    <FormInputs error={props.touched.club && !!props.errors.club}
                                                name="club"
                                                label="Club"/>

                                    <FormControl fullWidth>
                                        <InputLabel>Distance</InputLabel>
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
                                                <Button variant="outlined" type="submit">Register</Button>
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