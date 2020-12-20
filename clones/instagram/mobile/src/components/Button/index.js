import React from 'react';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

import loadingAnimation from '~/assets/loadingAnimated.json';
import { Container, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
  return (
    <Container {...rest}>
      {loading ? (
        <Lottie source={loadingAnimation} autoPlay loop />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
