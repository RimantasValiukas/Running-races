import {FormControl, FormHelperText, TextField} from "@mui/material";
import {ErrorMessage, Field} from "formik";

const FormInputs = ({error, name, label, ...props}) => (
    <FormControl error={error} fullWidth>
        <Field
            id={name}
            name={name}
            as={TextField}
            label={label}
            variant="outlined"
            error={error} {...props}/>
            <ErrorMessage name={name} component={FormHelperText}/>
    </FormControl>

);

export default FormInputs;