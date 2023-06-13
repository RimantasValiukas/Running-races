import {Link} from "@mui/material";
import {NavLink} from "react-router-dom";

const MenuBarItem = ({path, name}) => (
    <Link variant="button"
          to={path}
          component={NavLink}
          sx={{ my: 1, mx: 1.5, color: '#F9F7F7', textDecoration: 'none'}}>
        {name}
    </Link>
);

export default MenuBarItem;