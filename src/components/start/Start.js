// components
import Logging from '../logging/Logging';
import Welcome from '../welcome/Welcome';

//Firebase
import { isLogged } from '../../firebase/Firebase';

//imgs
import logo from '../../assets/pictures/logo.svg';

//styles
import './Start.css';
import '../../app/App.css';

function Start() { 
    
  return (
    <>
      <div className="start-page">
        <div className="logo-container">
          <img src={logo} className="logo" alt='logo'></img>
        </div>
        <div className="is-logged-container">
          {isLogged() ? <Welcome/> : <Logging/>}
          <div className="copyright-footer">
            <span className="copyright">© 2020 Devs_United - </span>
            <span className="copyright beta">BETA</span>
          </div>
        </div>
      </div>
        
    </>
  );
}

export default Start;