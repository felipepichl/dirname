import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',

  minHeight: 'calc(100vh - 4rem)', // Ajuste para considerar a altura do Header
  padding: '4rem 2rem 0',
})

export const Product = styled('a', {
  background: 'linear-gradient(180deg, #ff96a8 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  minHeight: 540,
  minWidth: 480,
  maxHeight: 540,
  maxWidth: 480,
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    overflow: 'hidden',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',

    strong: {
      fontSize: '$lg'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300'
    }
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  },
})