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
})

export const Background = styled(Image, {})
