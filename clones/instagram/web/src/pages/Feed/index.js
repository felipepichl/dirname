import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LikeButton from 'react-lottie';
import api from '~/services/api';

import Storie from '~/components/Storie';

import more from '../../assets/more.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';

import likeAnimation from '../../assets/liked.json';

import {
  Container,
  Post,
  PostButtons,
  PostLike,
  PostDescription,
  PostComment,
} from './styles';

export default function Feed() {
  const profile = useSelector(state => state.user.profile);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts');
      setPosts(response.data);
    }

    loadPosts();
  }, [posts]);

  function handleLike(id) {
    api.post(`/likes/${id}`);
  }

  return (
    <Container>
      <Storie />

      {posts.map(post => (
        <Post key={post._id}>
          <header>
            <div>
              <img src={post.user.preview} alt="Author" />
              <span>{post.user.username}</span>
            </div>
            <img src={more} alt="" />
          </header>

          <article>
            <img src={post.url} alt="Post" />
          </article>

          <footer>
            <PostButtons>
              <button type="button" onClick={() => handleLike(post._id)}>
                <LikeButton
                  options={{
                    animationData: likeAnimation,
                    loop: false,
                    autoplay: false,
                  }}
                  isStopped={post.likes.indexOf(profile._id) === -1}
                  height={35}
                  width={35}
                />
              </button>

              <button type="button" onClick={() => {}}>
                <img src={comment} alt="" />
              </button>

              <button type="button" onClick={() => {}}>
                <img src={send} alt="" />
              </button>
            </PostButtons>

            <PostLike>
              {post.lastLike.length === 0 || (
                <>
                  <img src={post.lastLike[0].preview} alt="" />

                  <span>Liked by</span>
                  <strong>{post.lastLike[0].username}</strong>
                  {post.likes.length > 1 ? (
                    <>
                      <span>and</span>{' '}
                      <strong>{post.likes.length - 1} others</strong>{' '}
                    </>
                  ) : (
                    ''
                  )}
                </>
              )}
            </PostLike>

            <PostDescription>
              <p>
                <strong>{post.user.username}</strong>
                {post.description}
              </p>
            </PostDescription>
          </footer>

          <form action="">
            <section>
              <textarea placeholder="Add a comment..." />
              <PostComment type="button">Post</PostComment>
            </section>
          </form>
        </Post>
      ))}
    </Container>
  );
}
