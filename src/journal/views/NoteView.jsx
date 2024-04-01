import { useMemo, useEffect, useRef } from "react"
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from "react-redux"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { setActiveNote, startSaveNote } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, savedMessage, isSaving } = useSelector( state => state.journal )

    const { body, title, date, onInputChange, formState } = useForm( note )

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if (savedMessage.length > 0) {
            Swal.fire('Nota actualizada', savedMessage, 'success')
        }
    }, [savedMessage])

    const fileInputRef = useRef();

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;
        console.log('subiendo archivos')
    }

  return (
    <Grid container directon='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{ dateString } - 25/09/2022</Typography>
        </Grid>
        <Grid item>
            <input type='file' multiple ref={fileInputRef} onChange={onFileInputChange} style={{display:'none'}}/>
            <IconButton>
                <UploadOutlined color="primary" disabled={isSaving} onClick={ () => fileInputRef.current.click() }/>
            </IconButton>
            <Button disabled={isSaving} onClick={onSaveNote} color='primary' sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize:30, mr: 2 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField type='text' variant="filled" fullWidth placeholder="Titulo" label='Titulo' sx={{ border: 'none', mb: 1 }} name="title" value={title} onChange={onInputChange}/>
            <TextField type='text' variant="filled" fullWidth multiline placeholder="Entrada" minRows={ 5 } name="body" value={body} onChange={onInputChange}/>
        </Grid>
        <ImageGallery/>
    </Grid>
  )
}
