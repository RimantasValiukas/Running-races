import {NavLink, useNavigate} from "react-router-dom";
import {Alert, Button} from "@mui/material";
import {deleteRace} from "./api/raceApi";
import {useState} from "react";

const DeleteRace = ({raceId}) => {

    const [message, setMessage] = useState({isVisible: false});
    const navigation = useNavigate();

    const onRaceDelete = () => {
        deleteRace(raceId)
            .then(() => {
                setMessage({isVisible: true, message: 'Race deleted successfully', severity: 'success'})
                setTimeout(() => navigation('/'), 1000);
            })
            .catch((error) => setMessage({isVisible: true, message: 'Race cannot be deleted', severity: 'error'}))
    }

    return (
        <>
            <Button size="small"
                    color='warning'
                    onClick={() => onRaceDelete()}>
                Delete
            </Button>
            {message.isVisible && <Alert severity={message.severity}>{message.message}</Alert>}
        </>
    );
}

export default DeleteRace;