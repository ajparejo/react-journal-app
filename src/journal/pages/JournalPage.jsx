import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from "../../store/journal";

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { isSaving, active } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a finibus ex. Phasellus placerat libero et risus porta condimentum. Nullam ac tellus vestibulum, venenatis eros id, sagittis ipsum. Suspendisse potenti. Proin blandit pulvinar dui non dignissim. Donec et neque a turpis varius molestie in quis erat. Maecenas ac urna vulputate. </Typography> */}
      {(!!active) ? <NoteView/> : <NothingSelectedView/>}
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{ color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
        position: 'fixed',
        right: 50,
        bottom: 50 }}>
        <AddOutlined/>
      </IconButton>
    </JournalLayout>
  )
}
