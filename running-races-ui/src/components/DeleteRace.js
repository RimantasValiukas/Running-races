import {NavLink, useNavigate} from "react-router-dom";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {deleteRace} from "./api/raceApi";
import {useState} from "react";

const DeleteRace = ({raceId}) => {

    const navigation = useNavigate();
    const [open, setOpen] = useState(false);

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
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this race?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={onRaceDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteRace;