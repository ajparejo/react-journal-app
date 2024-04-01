import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        
        return{
            ok: true,
            //Info Usuario
            displayName, email, photoURL, uid
        }

    } catch (error) {
        console.log(error)

        return{
            ok:false,
            errorMessage,
        }
    }

}

export const registerUserWithEmail = async({ email, password, displayName }) => {

    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;
        //console.log(response)
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        //console.log(error)
        return{ ok: false, errorMessage: error.message }
    }
}

export const loginWithEmail = async({email, password}) => {

    try{
        const resultado = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL, displayName} = resultado.user
        
        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        //console.log(error)
        return{ ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();

}