import * as Yup from 'yup';
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Form, Formik} from "formik";
import {createUser} from "../api/userApi";
import {Alert, Button, CircularProgress, FormHelperText, Stack, Typography} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import FormInputs from "./FormInputs";
import Container from "@mui/material/Container";

const userValidationSchema = Yup.object().shape(
    {
        username: Yup.string()
            .min(5, 'Name must be longer than 5')
            .max(10, 'Name must be shorter than 10')
            .required('Name is required'),
        surname: Yup.string()
            .min(5, 'Surname must be longer than 5')
            .max(10, 'Surname must be shorter than 10')
            .required('Surname is required'),
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email()
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone is required'),
        password: Yup.string()
            .min(10, 'Password must contain at least 10 symbols...')
            .required('Password is required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password is required')
    }
)
const UserRegistration = () => {

    const [message, setMessage] = useState({isVisible: false});
    const {t} = useTranslation('registration');

    const onCreateUser = (values, helper) => {
        const timestamp = new Date(values.dateOfBirth).getTime();
        const updatedValues = {
            ...values,
            dateOfBirth: timestamp,
        }

        createUser(updatedValues)
            .then(() => {
                setMessage({isVisible: true, message: t('successMessage'), severity: 'success'});
            })
            .catch((error) => {
                console.log('error ', error);
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'});
            })
            .finally(() => helper.setSubmitting(false));
    }


    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                dateOfBirth: null,
                password: '',
                repeatPassword: ''
            }}

            onSubmit={onCreateUser}

            validationSchema={userValidationSchema}
        >
            {props => (
                <Container maxWidth="md" sx={{marginTop: '90px'}}>
                    <Form>
                        {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
                        <Stack spacing={1} direction="column">
                            <Typography variant="h5">{t('userRegistration')}</Typography>
                            <FormInputs error={props.touched.name && !!props.errors.name}
                                        name="name"
                                        label={t('name')}/>
                            <FormInputs error={props.touched.surname && !!props.errors.surname}
                                        name="surname"
                                        label={t('surname')}/>
                            <FormInputs error={props.touched.email && !!props.errors.email}
                                        name="email"
                                        label={t('email')}/>

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

                            <FormInputs error={props.touched.password && !!props.errors.password}
                                        name="password"
                                        label={t('password')}
                                        type="password"/>
                            <FormInputs error={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                        name="repeatPassword"
                                        label={t('repeatPassword')}
                                        type="password"/>
                        </Stack>
                        <Typography sx={{textAlign: 'right', mt: 2}}>
                            {
                                props.isSubmitting ? <CircularProgress/> :
                                    <Button variant="outlined" type="submit">{t('register')}</Button>
                            }
                        </Typography>
                    </Form>
                </Container>
            )}
        </Formik>
    );
}

export default UserRegistration;