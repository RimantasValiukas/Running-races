import {createRace} from "../api/raceApi";
import {FieldArray, Form, Formik} from "formik";
import {Alert, Button, CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import FormInputs from "./FormInputs";
import Container from "@mui/material/Container";
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';
import {useState} from "react";


const raceValidationScheme = Yup.object().shape(
    {
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        description: Yup.string().required('Description is required'),
        organizer: Yup.string().required('Organizer is required'),
        dateTime: Yup.date().required('Date is required'),
        distances: Yup.array()
            .of(Yup.number().min(0.1, 'Distance can not be less than 0.1 km').required('Distance is required'))
            .min(1, 'At least one distance is required')
    });

const Race = () => {

    const [message, setMessage] = useState({isVisible: false});

    const onCreateRace = (values, helper) => {
        const timestamp = new Date(values.dateTime).getTime();
        const updatedValues = {
            ...values,
            dateTime: timestamp,
        };

        createRace(updatedValues)
            .then((response) => {
                helper.resetForm();
                setMessage({isVisible: true, message: 'Race created successfully', severity: 'success'});
            })
            .catch((error) => {
                setMessage({isVisible: true, message: 'Race cannot be created', severity: 'error'});
                console.log(error);
            })
            .finally(() => helper.setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{
                name: '',
                address: '',
                description: '',
                organizer: '',
                dateTime: null,
                distances: []
            }}
            onSubmit={onCreateRace}
            validationSchema={raceValidationScheme}
        >

            {props => (
                <Container maxWidth="md" sx={{marginTop: '20px'}}>
                    <Form>
                        <Stack spacing={2} direction="column">
                            {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                            <Typography variant="h5">Create Race:</Typography>
                            <FormInputs error={props.touched.name && !!props.errors.name}
                                        name="name"
                                        label="The name of the race"/>
                            <FormInputs error={props.touched.address && !!props.errors.address}
                                        name="address"
                                        label="Racing address"/>
                            <FormInputs error={props.touched.description && !!props.errors.description}
                                        name="description"
                                        label="Description"
                                        rows={3}
                                        multiline/>
                            <FormInputs error={props.touched.organizer && !!props.errors.organizer}
                                        name="organizer"
                                        label="Race organizer"/>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Race Date And Time"
                                    value={props.values.dateTime}
                                    onChange={(value) => props.setFieldValue("dateTime", value)}
                                    format="yyyy-MM-dd HH:mm:ss"
                                    onBlur={props.handleBlur("dateTime")}
                                />
                            </LocalizationProvider>

                            <FieldArray name="distances">
                                {(arrayHelpers) => (
                                    <>
                                        {props.values.distances.map((distance, index) => (
                                            <FormInputs
                                                key={index}
                                                name={`distances[${index}]`}
                                                label={`Distance (km)`}
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
                                                Add Distance
                                            </Button>
                                        </Typography>
                                    </>
                                )}
                            </FieldArray>
                            <Typography sx={{textAlign: 'center', mt: 2}}>
                                {
                                    props.isSubmitting ? <CircularProgress/> :
                                        <Button variant="outlined" type="submit">Create race</Button>
                                }
                            </Typography>
                        </Stack>
                    </Form>
                </Container>
            )}
        </Formik>
    );
}

export default Race;
