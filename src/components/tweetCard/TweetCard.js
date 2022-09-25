//Firebase
import { firestore, getCurrentUser } from "../../firebase/Firebase";

//icons
import fullHeart from '../../assets/pictures/full-heart.svg'
import emptyHeart from '../../assets/pictures/emptyHeart.svg'
import garbage from '../../assets/pictures/garbage.svg'

//React
import React, { useEffect, useState } from "react";

//styles
import "./TweetCard.css";

const TweetCard = ({ tweet }) => {
  const { id, userId } = tweet;

  const user = getCurrentUser();
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  const [buttonDisable, setButtonDisable] = useState(false);
  const [liked, setLiked] = useState();
  const [userColor, setUserColor]= useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isLikes = tweet.tweetLikes.find((userLike) => userLike === user.uid);
    setLiked(isLikes)
  },[tweet.tweetLikes, user.uid])

  useEffect(() => {
    firestore
      .doc(`users/${tweet.userId}`)
      .get()
      .then((snapshot)=>{
        setUserColor(snapshot.data().color)
        setUserName (snapshot.data().username)
      })
      return (
        console.log('exit')
      )
  },[tweet.userId]);

  // Borra el documento en Firebase por su id
  const handleDelete = () => {
    let option = window.confirm("¿Seguro que quiere borrar su Tweet?");
    if (option) {
      firestore.doc(`tweets/${id}`).delete();
    }
  };

  // Actualiza el documento de relacion de likes
  const handleLike = async () => {
    setButtonDisable(true);
    const tweetliked = await firestore
      .doc(`tweets/${tweet.id}`)
      .get();
    const index = tweetliked.data().tweetLikes.indexOf(user.uid);
    let localArray = tweetliked.data().tweetLikes;
    if (index >=0) {
      setLiked(false);
      localArray.splice(index, 1);
    } else {
      setLiked(true);
      localArray.push(user.uid);
    }
    firestore
    .doc(`tweets/${tweet.id}`)
    .update({ tweetLikes: localArray });
    setButtonDisable(false);
  };

  const tweetDate = (date) => {
    const newDate = new Date(date);
      return `${newDate.getDate()}${month[newDate.getMonth()]}`;
  };

  return (
    <div key={tweet.id} className='tweet-card'>
      <img className='tweet-user-img' src={tweet.photo} alt="Tweet user" />
      <div className='tweet-container'>
        <div className='tweet-header'>
          <div>  
            <h1 className={`username-${userColor}`}>{userName}</h1>
            <span className='date'>- {tweetDate(tweet.date)}.</span>
          </div>
          {
          userId === user?.uid ?
          <button onClick={() => handleDelete()} className='garbage'>
            <img src={garbage} className='garbage' alt="garbage"></img>
          </button> : <></>
          }
        </div>
        <h4>{tweet.tweet}</h4>
        {
          user != null ?
            <div className='tweet-footer'>
              <button onClick={handleLike} className='heart-button' disabled={buttonDisable}>
                {liked ? 
                <img src={fullHeart} className='full-heart heart-button' alt="full-heart"></img> :
                <img src={emptyHeart} className='empty-heart heart-button' alt="empty-heart"></img>
                }
              </button>
              <span className={`likes-number ${liked ? 'red-number' : ''}`}>{tweet.tweetLikes?.length ?? 0}</span>
            </div> :
            <div className={`likes-number ${liked ? 'red-number' : ''}`}>{tweet.tweetLikes?.length ?? 0}</div>
        }
      </div>
    </div>
  );
}

function tweetsPropsAreEqual(prevProps, nextProps) {
  const result =
    prevProps.tweet.tweetLikes.length === nextProps.tweet.tweetLikes.length;
  return result;
}

export default React.memo(TweetCard, (prevProps, nextProps) =>
  tweetsPropsAreEqual(prevProps, nextProps)
);