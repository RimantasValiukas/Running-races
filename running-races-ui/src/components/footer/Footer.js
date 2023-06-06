import Typography from "@mui/material/Typography";
import { Link, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

const Footer = () => {
    const theme = useTheme();

    function Copyright() {
        return (
            <Typography variant="body2" color="#F9F7F7" align="center">
                {'Copyright © '}
                <Link color="#F9F7F7" href="https://codeacademy.lt/">
                    CodeAcademyLT
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: '#112D4E',
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                width: '100%',
                marginTop: 'auto',
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
                mt: '20px'
            }}
            component="footer"
        >
            <Typography variant="h6" align="center" color="#F9F7F7" gutterBottom>
                RunRaceBook
            </Typography>
            <Typography variant="subtitle1" align="center" color="#F9F7F7" component="p">
                Run with passion, embrace the challenge, and let the rhythm of your footsteps guide you to new heights.
            </Typography>
            <Box sx={{ paddingTop: theme.spacing(2) }}>
                <Copyright />
            </Box>
        </Box>
    );
};

export default Footer;
