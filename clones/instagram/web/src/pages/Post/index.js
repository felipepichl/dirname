import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import Dropzone from 'react-dropzone';
import UploadButton from 'react-lottie';

import history from '~/services/history';
import api from '~/services/api';

import uploadAnimation from '../../assets/upload.json';
import uploadAnimationComplete from '../../assets/uploadComplete.json';

import { Container, Content, DropContainer, UploadMessage } from './styles';

export default function Post() {
  const [image, setImage] = useState();

  async function handleSubmit({ description }) {
    const data = new FormData();

    data.append('image', image);
    data.append('description', description);

    await api.post('/posts', data);
    history.push('/feed');
  }

  async function handleChange(e) {
    setImage(null);
    setImage(e[0]);
  }

  function renderDragMessage(isDragActive, isDragReject) {
    if (!isDragActive) {
      return <UploadMessage>Drag a photo or click</UploadMessage>;
    }
    if (isDragReject) {
      return <UploadMessage type="error">Unsupported files</UploadMessage>;
    }

    return <UploadMessage type="success">Drop the files here</UploadMessage>;
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit}>
          <Dropzone accept="image/*" onDropAccepted={handleChange}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <DropContainer
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              >
                <UploadButton
                  options={{
                    animationData: image
                      ? uploadAnimationComplete
                      : uploadAnimation,
                    loop: !image,
                    autoplay: !image,
                  }}
                  height={70}
                  width={70}
                />
                {renderDragMessage(isDragActive, isDragReject)}
                <input {...getInputProps()} />
              </DropContainer>
            )}
          </Dropzone>

          <Input name="description" type="text" placeholder="Description" />

          <button type="submit">Send</button>
        </Form>
      </Content>
    </Container>
  );
}
