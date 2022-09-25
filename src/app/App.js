//components
import Start from '../components/start/Start';
import Feed from '../components/feed/Feed';
import UserProfile from '../components/userProfile/UserProfile';

//Firebase
import { auth } from '../firebase/Firebase';

//React
import { useEffect, useState } from 'react';
import { Routes, Route} from "react-router-dom";

//styles
import './App.css';

function App() {
  
  const [user, setUser] = useState(null)

  useEffect (()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  },[])

  return (
  <div className="app">
      <Routes>
        <Route exact path="/" element={<Start/>}/> 
        <Route path="/feed"element={<Feed/>}/>
        <Route path="/userprofile"element={<UserProfile/>}/>
        <Route path="/tweets" element={<Start/>}/>
      </Routes>
  </div>
  );
}

export default App;
