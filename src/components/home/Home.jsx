import React, { useEffect, useState, useCallback } from 'react';
import './home.css';
import { getDocs, collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const orderedPostCollectionRef = query(postsCollectionRef, orderBy("createdAt", "desc"));

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    window.location.reload()
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs
        (orderedPostCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error);
      } 
    };
    getPosts();
  }, []);

  return (
    <div className='homePage'>
      <div className="posts">
        {postList.map((post) => {
          return (
            <div className='post' key={post.id}>
              <div className='postHeader'>
                <div className="title">
                  <h1>{post.title}</h1>
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
              <div className="postBottomRow">
                <h4>
                  @{post.author.name}
                </h4>
                <h5>
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}
                </h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;