import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Post = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;

  width: 600px;
  max-width: 600px;

  @media screen and (max-width: 600px) {
    width: 100%;
    border: none;
    margin: 0;

    > form {
      display: none;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 15px;

    div {
      display: flex;
      align-items: center;

      /**
       * avatar
      */
      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
      }

      /**
       * username
      */
      span {
        font-weight: bold;
        margin: 0 10px 0 10px;
      }
    }
  }

  article {
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(38, 38, 38, 0.1);
  }

  article > img {
    max-width: 600px;
    max-height: 750px;
    width: auto;
    height: auto;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  footer {
    padding: 15px;
  }

  form {
    section {
      display: flex;
      align-items: center;
      border-top: 1px solid rgba(38, 38, 38, 0.1);

      padding-left: 16px;
      padding-right: 16px;
      min-height: 56px;

      textarea {
        resize: none;
        border: none;
        width: 100%;
        height: 18px;
        max-height: 80px;
        font-size: inherit;
        ::-webkit-input-placeholder {
          text-align: left;
        }
      }
    }
  }
`;

export const PostButtons = styled.div`
  button {
    margin-right: 5px;

    img {
      padding: 5px;
    }
  }
`;

export const PostLike = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    max-width: 24px;
    max-height: 24px;
    min-width: 24px;
    min-height: 24px;
    width: auto;
    height: auto;
    border-radius: 50%;
    margin-right: 4px;
    margin-left: 4px;
  }

  span {
    margin-right: 5px;
  }

  strong {
    margin-right: 5px;
  }
`;

export const PostDescription = styled.div`
  strong {
    margin-left: 10px;
    margin-right: 5px;
  }
`;

export const PostComment = styled.button`
  color: #3897f0;
  font-weight: bold;
`;
