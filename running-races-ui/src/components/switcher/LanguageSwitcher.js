import {FormControl, IconButton, Menu, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";
import LanguageIcon from '@mui/icons-material/Language';
import {useState} from "react";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (language) => {
        i18n.changeLanguage(language);
        handleClose();
    };

    return (
        <FormControl size="small">
            <IconButton
                aria-label="language"
                onClick={handleClick}
            >
                <LanguageIcon sx={{width: 29, height: 29, color: '#F9F7F7'}}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={() => handleChange("en")} selected={i18n.language === "en"}>
                    EN
                </MenuItem>
                <MenuItem onClick={() => handleChange("lt")} selected={i18n.language === "lt"}>
                    LT
                </MenuItem>
            </Menu>
        </FormControl>
    );
};


export default LanguageSwitcher;