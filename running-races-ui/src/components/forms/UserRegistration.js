import * as Yup from 'yup';
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ErrorMessage, Form, Formik} from "formik";
import {createUser, getUser} from "../api/userApi";
import {Alert, Button, CircularProgress, FormHelperText, Stack, Typography} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import FormInputs from "./FormInputs";
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const UserRegistration = () => {

    const [message, setMessage] = useState({isVisible: false});
    const {t} = useTranslation('registration');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        dateOfBirth: null,
        password: '',
        repeatPassword: ''
    })

    const onCreateUser = (values, helper) => {
        const timestamp = new Date(values.dateOfBirth).getTime();
        const updatedValues = {
            ...values,
            dateOfBirth: timestamp,
        }

        createUser(updatedValues)
            .then(() => {
                setMessage({isVisible: true, message: t('successMessage'), severity: 'success'});
                helper.resetForm();
            })
            .catch((error) => {
                console.log('error ', error);
                setMessage({isVisible: true, message: t('errorMessage'), severity: 'error'});
            })
            .finally(() => helper.setSubmitting(false));
    }

    const userValidationSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(3, t('validation.name.min'))
                .required(t('validation.name.required')),
            surname: Yup.string()
                .min(3, t('validation.surname.min'))
                .required(t('validation.surname.required')),
            email: Yup.string()
                .email(t('validation.email.email'))
                .required(t('validation.email.required')),
            dateOfBirth: Yup.date()
                .required(t('validation.dateOfBirth.required')),
            password: Yup.string()
                .min(10, t('validation.password.min'))
                .required(t('validation.password.required')),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], t('validation.repeatPassword.match'))
                .required(t('validation.repeatPassword.required'))
        }
    )

    return (

        <Formik
            initialValues={user}

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