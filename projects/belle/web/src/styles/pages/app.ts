import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '2rem 0', 
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem',
  width: '100%',
  backgroundColor: '$gray900',
  position: 'fixed',
  top: 0,
  zIndex: 1000,

  minHeight: 'auto',
})