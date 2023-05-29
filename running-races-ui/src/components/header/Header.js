import {AppBar, Button, Link, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import Box from "@mui/material/Box";

const Header = () => {

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textDecoration: 'unset' }} to="/" component={NavLink}>
                    Running Races
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <nav>
                        <MenuItem path="/" name="Home" />
                        <MenuItem path="/races/create" name="Create Race" />
                        <MenuItem path="/users/register" name="User Registration" />
                    </nav>
                </Box>
                <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;