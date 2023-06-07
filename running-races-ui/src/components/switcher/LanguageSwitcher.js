import {FormControl, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n/i18n";

const LanguageSwitcher = () => {
    const {i18n} = useTranslation();

    const handleChange = (event) => i18n.changeLanguage(event.target.value);

    return (
        <FormControl size="small">
            <Select value={i18n.language}
                    onChange={handleChange}
                    sx={{fontSize: '0.875rem', color: '#F9F7F7', borderColor: '#F9F7F7'}}>
                <MenuItem value='en'
                          selected={i18n.language === 'en'}
                          sx={{fontSize: '0.875rem'}}>EN</MenuItem>
                <MenuItem value='lt'
                          selected={i18n.language === 'lt'}
                          sx={{fontSize: '0.875rem'}}>LT</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSwitcher;