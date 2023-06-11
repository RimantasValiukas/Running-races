import {NavLink, useNavigate} from "react-router-dom";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {deleteRace} from "./api/raceApi";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const DeleteRace = ({raceId}) => {

    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const {t} = useTranslation('raceDetail');

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const onRaceDelete = () => {
        deleteRace(raceId)
            .then(() => navigation('/'))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <Button size="small" color="warning" onClick={handleOpen}>
                {t('delete')}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('titleConfirm')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('deleteConfirmation')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('cancel')}</Button>
                    <Button onClick={onRaceDelete} color="error">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteRace;