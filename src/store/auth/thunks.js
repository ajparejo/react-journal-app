import { async } from "@firebase/util";
import { signInWithGoogle, registerUserWithEmail, loginWithEmail, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const revisarAutentificacion = (email, password) => {
    return async ( dispatch ) => {

        dispatch(checkingCredentials());

    }
}

export const iniciarConexionGoogle = () => {
    return async ( dispatch ) => {

        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        
        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch( login(result) )
        
    }
}

export const iniciarLoginUsuario = ({email, password}) => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
        const resp = await loginWithEmail({email, password});
        console.log(resp);

        if (!resp.ok) return dispatch(logout(resp));
        dispatch( login(resp) )
    }
}

export const iniciarCreacionUsuarioConEmail = ({email, password, displayName}) => {
    return async(dispatch) => {
        
        dispatch(checkingCredentials());
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmail({email, password, displayName});
        
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch( login({uid, displayName, email, photoURL}));
    }
}

export const iniciarDesconexion = () => {
    return async(dispatch) => {
        await logoutFirebase();
        dispatch(logout({errorMessage:null}));
    }
}