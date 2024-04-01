import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components"

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">
        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth}/>
        {/* Navbar */}
        <SideBar drawerWidth={drawerWidth}/>
        {/* Contenido */}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar/>
            { children }
        </Box>
    </Box>
  )
}
