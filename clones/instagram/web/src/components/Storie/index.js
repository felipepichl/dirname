import React, { useState, useEffect } from 'react';
import LoadingHistory from 'react-lottie';
import api from '~/services/api';

import { Container, User } from './styles';

import historyAnimation from '~/assets/history.json';

export default function Storie() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('users');

      setUsers(response.data);
    }

    loadUsers();
  }, [users]);

  return (
    <Container>
      {users.map(user => (
        <>
          <User key={user._id}>
            <div>
              <LoadingHistory
                options={{
                  animationData: historyAnimation,
                  loop: true,
                  autoplay: true,
                }}
                height={90}
                width={90}
              />
              <img src={user.preview} alt="" />
            </div>

            {/* <div>
            <img src={user.preview} alt="" />

            <img
              src={{
                uri: user.avatar
                  ? user.avatar.url
                  : 'https://api.adorable.io/avatars/60/abott@adorable.png',
              }}
              alt=""
            />
          </div> */}

            <p>
              {user.username.length > 7
                ? `${user.username.substring(0, 7)}...`
                : user.username}
            </p>
          </User>
        </>
      ))}
    </Container>
  );
}
