import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Post from "./components/Post/Post";
import OpenRoute from "./components/Auth/OpenRoute";
import Profile from "./pages/Profile";
import CreatePost from "./components/CreatePost/CreatePost";
import Layout from "./components/Layout";
import PrivateRoute from "./components/Auth/PrivateRoute";
import CommingSoon from "./components/ExceptionHandle/CommingSoon";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          
          <Route path="/login" element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }/>
          <Route path="/signup" element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }/>

          //TODO: If user is authenticated then open Login components otherwis
          {/* <Route path="/" element={<Login/>}/> */}

          <Route path="/" element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>  
            }>
              <Route path="/" element={<Post/>}/>  
              <Route path="user" element={<Profile />} />
          </Route>
            
         <Route path="*" element={<CommingSoon/>}/>
          
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
