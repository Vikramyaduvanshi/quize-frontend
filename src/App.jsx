import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { PrivateRoute } from "./routes/PrivateRoutes"
import { Navbar } from "./components/Navbar"
import { Users } from "./pages/Users"
import {Topics} from "./pages/Topics"
import { Questions } from "./pages/Questions"
import { Quize } from "./pages/Quiz"
import { Result } from "./pages/Result"
import { Profile } from "./pages/Profile"
import { Fulldetails } from "./pages/fulldetails"
import { Quizedetails } from "./components/quizedetails"
import { Attendquize } from "./pages/Attendquize"
import { Forgotpassword } from "./pages/Forgotpaaaword"
import { Reset_Password } from "./pages/Reset_password"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword/>}/>
        <Route path="/reset_password" element={<Reset_Password/>}/>
       
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<Users/>}/>
          <Route path="/topics" element={<Topics />} />
          <Route path="/questions" element={<Questions/>} />
          <Route path="/quizes" element={<Quize/>} />
          <Route path="/results" element={<Result/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/fulldetails/:id" element={<Fulldetails/>}/>
          <Route path="/quizedetails/:id" element={<Quizedetails/>}/>
          <Route path="/attendquize" element={<Attendquize/>}/>
          
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
