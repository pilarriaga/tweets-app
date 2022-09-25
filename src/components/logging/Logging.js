//Firebase
import { googleLogin } from '../../firebase/Firebase';

//imgs
import buttonGoogle from '../../assets/pictures/buttonGoogle.svg';

//style
import './Logging.css';

function Logging() {

  return (
    <>
      <div className="logging-container">
        <h1 className="welcome-title">Bienvenido a Devs_united!</h1>
        <h4 className="logging-title">Registrate ahora!</h4>
        <button type="button" onClick={googleLogin} className="button-logging">
          <img src={buttonGoogle} className="google-button" alt='googleButton'></img>
        </button>
      </div>
    </>
  );
}

export default Logging;


