import { useMemo } from "react";
import { Link as RegLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from '../../hooks'
import { iniciarConexionGoogle, iniciarLoginUsuario } from "../../store/auth/thunks";

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth )

  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm(formData);

  const estaAutenticado = useMemo( () => status === 'checking', [status] )

  const onSubmit = ( event ) => {
    event.preventDefault();
    //console.log({ email, password });
    dispatch(iniciarLoginUsuario({email, password}))
  }

  const onGoogleSignIn = () => {
    console.log('conexion via Google')
    dispatch(iniciarConexionGoogle());
  }

  return (
    <AuthLayout titulo={'Pagina Login'}>
        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField label='Correo' type='email' placeholder="ingrese correo" fullWidth name="email" value={email} onChange={onInputChange}/>
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField label='Contraseña' type='password' placeholder="ingrese contraseña" fullWidth name="password" value={password} onChange={onInputChange}/>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} display={!!errorMessage ? '': 'none'}>
              <Alert severity="error">El usuario no esta registrado</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={estaAutenticado}
                type="submit" variant='contained' fullWidth>
                  Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={estaAutenticado}
                variant='contained' fullWidth onClick={ onGoogleSignIn }>
                <Google/>
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Link component={ RegLink } color='inherit' to='/auth/register'>Crear Cuenta</Link>
          </Grid>
        </form>
    </AuthLayout>
  )
}
