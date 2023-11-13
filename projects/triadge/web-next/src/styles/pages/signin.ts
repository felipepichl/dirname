import { styled } from '..'

import Image from 'next/image'

export const Container = styled('div', {
  height: '100vh',

  display: 'flex',
  alignItems: 'stretch',
})

export const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  maxWidth: '700',
})

export const AnimationContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  form: {
    margin: '80 0',
    width: '340px',
    textAlign: 'center',

    h1: {
      marginBottom: '$6',
    },
  },

  '@media (min-width: 768px)': {
    form: {
      margin: '$16',
      width: '340px',
    },
  },
})

export const Background = styled(Image, {
  filter: 'blur(0)', // Valor inicial de desfoque

  '@media (min-width: 778px) and (min-height: 840px)': {
    filter: 'blur(10px)', // Aplica o desfoque quando a tela for maior que a imagem
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    objectFit: 'cover',
  },

  '@media (max-width: 767px)': {
    display: 'none',
  },
})
