import React, { useEffect, useState, useCallback } from 'react';
import './home.css';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, [deletePost]);

  return (
    <div className='homePage'>
        {postLists.map((post) => {
          return (
            <div className='post'>
              <div className='postHeader'>
                <div className="title">
                  <h1> {post.title} hey </h1>
                </div>
                <div className="deletePost">
                  {isAuth && post.author.id === auth.currentUser.uid && (
                    <button
                      className='deletePostButton'
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="postTextContainer">
                {post.postText}
              </div>
              <h4>
                {post.author.name}
              </h4>
            </div>
          )
        })}
    </div>
  )
}

export default Home;