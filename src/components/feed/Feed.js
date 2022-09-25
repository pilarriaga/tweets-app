//components
import TweetCard from "../tweetCard/TweetCard";

//Firebase
import {auth, firestore, getCurrentUser} from "../../firebase/Firebase";

//imgs
import headerTitle from '../../assets/pictures/header-title.svg'
import post from '../../assets/pictures/post.svg'
import smallLogo from '../../assets/pictures/smalllogo.svg'


//React
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

//styles
import "./Feed.css";

//problema de ejecucion en useEffect
function Feed() {

  let navigate = useNavigate();
  let user = getCurrentUser();

  const goToProfile = (e) =>{
    navigate('/userprofile')
  }

  // Estructura del tweet que creamos para enviar a Firebase
  const [tweet, setTweet] = useState({
    author: '',
    tweetLikes: [],
    photo: '',
    tweet: '',
    user: user !== null ?  user.uid : "",
    id:'',
  });

  const [tweetValue, setTweetValue] = useState(''); 

  // Estado local para los tweets que hay en firebase
  const [tweets, setTweets] = useState([]);

  const [userColor, setUserColor] = useState ("");
  

  //Variable para darle estilo a la barra de input completado
  let tweetLength = (tweetValue.length)/2 + '%';

  // Crea la conexión para escuchar cambios en el documento de Firebase
  const tweetsListener = () =>
    firestore.collection("tweets").orderBy("date", "desc").onSnapshot(
      (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          firestore.doc(`tweets/${doc.id}`).update({ id: doc.id });
          return {
            ...doc.data(),
            id: doc.id,
          };
        }, () => {
          console.error("Sucedio un error");
          }
        );
        setTweets(tweets);
      }, (error) => {
        console.error(error);
        }
    );
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user !== null) {
          firestore
          .doc(`users/${user.uid}`)
          .get()
          .then((snapshot) => { 
            setUserColor(snapshot.data().color);
          })
          const unsuscribeTweets = tweetsListener();
          return () => {
            // Limpiamos el listener creado cuando se desmonta el componente
            unsuscribeTweets();
          };
        } else {navigate('/tweets')}
      })
    },[navigate]);  
    
  // Actualiza el estado local del tweet que vamos a enviar a Firebase
  const handleNewTweet = (e) => {
    const date = new Date();
    let newTweet = {
      ...tweet,
      author: user.displayName,
      photo: user.photoURL,
      tweet: e.target.value,
      userId: user.uid,
      date: date.getTime() + date.getMinutes() + date.getSeconds(),
    }
    setTweet(newTweet);
    setTweetValue(newTweet.tweet)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendTweet(e);
    }
  }
  
  // Envia el tweet local a Firebase
  const sendTweet = (e) => {
    e.preventDefault();
    try {
      firestore.collection("tweets").add(tweet);
    } catch (error) {
      console.error(error);
    }
    setTweetValue('');
  };

  return (
    <div className="feed">
      <div className="header">
        <div className="header-container">
          <button type="button" className='header-user' onClick={goToProfile}>
            <img src={user?.photoURL} className={`header-user border-${userColor}`} alt="Header user"></img>
          </button>
          <img src={smallLogo} className="small-logo" alt="Small Logo"></img>
          <div>
            <img src={headerTitle} className="header-title" alt="Header title"></img>
          </div>
        </div>
      </div>
      <div className="tweets-container">
        <div className="input-container">
          <div className="input-block">
            <img src={user?.photoURL} alt='User' className='form-user'></img>
            <form className="form-container">
              <textarea 
                onChange={handleNewTweet}
                onKeyDown={handleKeyDown} 
                className='text-area'
                placeholder="What's happening?"
                value={tweetValue} 
                name='tweet'
                min='0'
                max='200'
                maxLength='200'>
              </textarea>
                <div className='tweet-length-bar' style={{width: tweetLength}}></div>
              <div className="text-area-details">
                <span className="tweet-length">{tweetValue.length}</span>
                <span className="max-tweet-length">200 max.</span>
              </div>
              <div className="post-button-container">
                <button type='submit' onClick={sendTweet} disabled={!tweetValue} className='post-button'>
                  <img src={post} className='post-img' alt="post-button"></img>
                </button> 
              </div>
            </form>
          </div>
        </div>
        <div className="tweets-list">
          {tweets.map((tweet) => {
            return <TweetCard key={tweet.id} tweet={tweet} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Feed;