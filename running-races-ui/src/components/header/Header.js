import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Link,
    useMediaQuery,
    useTheme,
    Tooltip, Avatar, Divider, ListItemIcon
} from '@mui/material';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from "../switcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";
import MenuBarItem from "./MenuBarItem";
import {useDispatch, useSelector} from "react-redux";
import {Logout, Settings} from "@mui/icons-material";
import {removeUser} from "../../store/slices/userSlice";

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);
    const {t} = useTranslation('header');
    const user = useSelector(state => state.user.user);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(removeUser());
    }


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="fixed"
            sx={{backgroundColor: '#112D4E', borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
        >
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography variant="h6" color="inherit" noWrap component={NavLink} to="/"
                            sx={{flexGrow: 1, textDecoration: 'unset', color: '#F9F7F7'}}>
                    RunRaceBook
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            edge="end"
                            sx={{display: {sm: 'block', md: 'none'}}}
                        >
                            <MenuIcon/>
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
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem component={NavLink} to="/" sx={{color: '#112D4E'}}>
                                {t('home')}
                            </MenuItem>
                            <MenuItem component={NavLink} to="/races/previous" sx={{color: '#112D4E'}}>
                                {t('previous')}
                            </MenuItem>
                            {user?.roles.includes('ADMIN') && <MenuItem component={NavLink} to="/races/create" sx={{color: '#112D4E'}}>
                                {t('create')}
                            </MenuItem>}
                            <MenuItem component={NavLink} to="/registration" sx={{color: '#112D4E'}}>
                                {t('registration')}
                            </MenuItem>
                            <MenuItem component={NavLink} to="/login" sx={{color: '#112D4E'}}>
                                {t('login')}
                            </MenuItem>

                        </Menu>
                    </>
                ) : (
                    <>
                        <MenuBarItem path='/' name={t('home')}/>
                        <MenuBarItem path='/races/previous' name={t('previous')}/>
                        {user?.roles.includes('ADMIN') && <MenuBarItem path="/races/create" name={t('create')}/>}
                        <MenuBarItem path="/registration" name={t('registration')}/>

                        <LanguageSwitcher/>

                        {
                            user ?
                                <>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{mx: 2}}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{width: 32, height: 32}}></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
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
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                                        <MenuItem>
                                            <Avatar/> {user.fullName}
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Settings fontSize="small"/>
                                            </ListItemIcon>
                                            Settings
                                        </MenuItem>
                                        <MenuItem onClick={onLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small"/>
                                            </ListItemIcon>
                                            {t('logout')}
                                        </MenuItem>
                                    </Menu>
                                </>
                                :
                                <Button to="/login" component={NavLink} variant="outlined"
                                        sx={{my: 1, mx: 1.5, color: '#F9F7F7', borderColor: '#F9F7F7'}}>
                                    {t('login')}
                                </Button>
                        }


                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
