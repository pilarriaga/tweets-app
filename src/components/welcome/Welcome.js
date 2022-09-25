//Firebase
import { firestore, getCurrentUser } from '../../firebase/Firebase';

//React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import './Welcome.css';
import '../../app/App.css';

function Welcome() {

  let navigate = useNavigate();
  let user = getCurrentUser();

  const [loading, setLoading] = useState(false);
  const [userColor, setUserColor] = useState("");
  const [userName, setUserName] = useState("");
  

  const userChange = (e) => {
    setUserName(e.target.value);
  };

  const colorChange = (e) => {
    setUserColor(e.currentTarget.dataset.color);
  };

  const continueClick = (e) => {
    if (userColor !== "" && userName.length !== 0) {
      setLoading(true)
      setTimeout(function () {
        firestore
        .collection('users')
        .doc(user.uid)
        .set({ name:user.displayName, email:user.email, color:userColor, username:userName })
        setLoading(false)
        navigate('/feed')
      }, 2000);
    } else {
      console.log("aqui")
      alert("You need to pick a user name and a color!")
    }
  };


  return (
    <> 
      {loading ? 
      <div  className="loader"></div> : 
      <div className="welcome-container">
        <div>
          <span className="welcome">WELCOME </span>
          <span className="welcome beta">{user.displayName}!</span>
        </div>
        <input 
          type="text" 
          placeholder="Type your username" 
          className="username" 
          onChange={userChange}
          maxLength="18">
        </input>
        <div className="p-select-color">Select your favorite color</div>
        <div className="colors-container"> 
          <button className="color-button beta-background" type="button" onClick={colorChange} data-color="beta">
          </button>
          <button className="color-button orange" type="button" onClick={colorChange} data-color="orange">
          </button>
          <button className="color-button yellow" type="button" onClick={colorChange} data-color="yellow">
          </button>
          <button className="color-button green" type="button" onClick={colorChange} data-color="green">
          </button>
          <button className="color-button blue" type="button" onClick={colorChange} data-color="blue">
          </button>
          <button className="color-button purple" type="button" onClick={colorChange} data-color="purple">
          </button>
        </div>
        <button 
          type="button" 
          className="continue-button"
          onClick={continueClick}>
          CONTINUE
        </button>
      </div>
      }
    </>
  );
}

export default Welcome;