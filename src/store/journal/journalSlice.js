import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [{}],
        active: null,
    },
    reducers: {
        savingNotes: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSavingNote: (state) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if (note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            });
            state.savedMessage = `${action.payload.title} se actualizó correctamente`
        },
        deleteNoteById: (state, action) => {
            //lasdlañsldñalsd
        },
    }
});


export const { savingNotes,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSavingNote,
    updateNote,
    deleteNoteById,
} = journalSlice.actions;