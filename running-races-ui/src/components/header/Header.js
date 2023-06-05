import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Menu, MenuItem, Link, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: '#ccd5ae', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'unset', color: '#faedcd' }}>
                    Running Races
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            edge="end"
                            sx={{ display: { sm: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem component={NavLink} to="/" exact sx={{ color: '#a3b18a' }}>
                                Home
                            </MenuItem>
                            <MenuItem component={NavLink} to="/races/create" sx={{ color: '#a3b18a' }}>
                                Create Race
                            </MenuItem>
                            <MenuItem component={NavLink} to="/users/register" sx={{ color: '#a3b18a' }}>
                                User Registration
                            </MenuItem>
                            <MenuItem component={NavLink} to="/login" sx={{ color: '#a3b18a' }}>
                                Login
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <>
                        <nav>
                            <Link variant="button" color="text.primary" to="/" component={NavLink} sx={{ my: 1, mx: 1.5, color: '#d4a373', textDecoration: 'none'}}>
                                Home
                            </Link>
                            <Link variant="button" color="text.primary" to="/races/create" component={NavLink} sx={{ my: 1, mx: 1.5, color: '#d4a373', textDecoration: 'none' }}>
                                Create Race
                            </Link>
                            <Link variant="button" color="text.primary" to="/users/register" component={NavLink} sx={{ my: 1, mx: 1.5, color: '#d4a373', textDecoration: 'none' }}>
                                User Registration
                            </Link>
                        </nav>
                        <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5, color: '#faedcd', borderColor: '#faedcd' }}>
                            Login
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
