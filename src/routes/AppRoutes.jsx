import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../UI"
import { useCheckAuth } from "../hooks"


export const AppRoutes = () => {

  const status = useCheckAuth();
  if(status === 'checking'){
    return <CheckingAuth/>
  }

  return (
    <Routes>

        {
          (status === 'authent')
          ? <Route path="/*" element={ <JournalRoutes/> }/>
          : <Route path="/auth/*" element={ <AuthRoutes/> }/>
        }
        <Route path="/*" element={ <Navigate to='/auth/login' /> }/>
        {/* pagina de registro y login */}
        {/* <Route path="/auth/*" element={ <AuthRoutes/> }/>
        <Route path="/*" element={ <JournalRoutes/> }/> */}
    </Routes>
  )
}
