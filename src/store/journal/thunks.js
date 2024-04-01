import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNotes, setActiveNote, setNotes, setSavingNote, updateNote } from './journalSlice';
import { loadNotes } from '../../journal/helpers';

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNotes())
        
        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc(newDoc, newNote);

        console.log({newDoc, setDocResp});

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error("No hay usuario conectado");
    
        const notes = await loadNotes( uid )
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSavingNote());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFireStore, {merge: true} );

        dispatch(updateNote(note));
    }
}