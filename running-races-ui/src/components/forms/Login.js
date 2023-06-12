import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Avatar, Box, Button, Checkbox, CircularProgress, Container, createTheme, CssBaseline, FormControlLabel, Grid, Link, Typography} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormInputs from "./FormInputs";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const loginValidationSchema = Yup.object().shape(
    {
        email: Yup.string().required(),
        password: Yup.string().required()
    }
);

const defaultTheme = createTheme();

const Login = () => {

    const {t} = useTranslation('login');
    const onLogin = (values, helpers) => {
        console.log(values);
    }

    return (

        <Formik
            initialValues={ {email: '', password: ''} }

            onSubmit={ onLogin }

            validationSchema={ loginValidationSchema }>

            { props => (
                <ThemeProvider theme={ defaultTheme }>
                    <Container component="main" maxWidth="xs" sx={{mt: '90px'}}>
                        <CssBaseline/>
                        <Box
                            sx={ {
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            } }
                        >
                            <Avatar sx={ {m: 1, bgcolor: 'secondary.main'} }>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t('signin')}
                            </Typography>
                            <Box noValidate sx={ {mt: 1} }>
                                <Form>
                                    <FormInputs error={ props.touched.email && !!props.errors.email }
                                                   name="email"
                                                   label={t('email')}
                                                   fullWidth
                                                   margin="normal"/>
                                    <FormInputs error={ props.touched.password && !!props.errors.password }
                                                   name="password"
                                                   label={t('password')}
                                                   fullWidth
                                                   margin="normal"
                                                   type="password"/>

                                    <FormControlLabel
                                        control={ <Checkbox value="remember" color="primary"/> }
                                        label={t('remember')}
                                    />
                                    {
                                        props.isSubmitting ?
                                            <Box
                                                sx={ {
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    mt: 3,
                                                    mb: 2
                                                } }
                                            >
                                                <CircularProgress size={ 36 }/>
                                            </Box> :
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={ {mt: 3, mb: 2, backgroundColor: '#112D4E', color: '#F9F7F7'} }>
                                                {t('signin')}
                                            </Button>
                                    }

                                    <Grid container>
                                        <Grid item>
                                            <Link to="/register" component={NavLink} variant="body2" sx={{color: '#112D4E'}}>
                                                { t('noAccount') }
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Form>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )
            }
        </Formik>

    );
}

export default Login;