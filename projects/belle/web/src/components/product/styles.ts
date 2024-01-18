import { styled } from '@/styles'

export const Container = styled('div', {
  background: 'linear-gradient(180deg, #ff96a8 0%, #7465d4 100%)',
  borderRadius: '2rem',
  position: 'relative',

  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  footer: {
    position: 'absolute',
    
    bottom: '0.28rem',
    left: '0.28rem',
    right: '0.28rem',
    
    height: '6.2rem',
    padding: '2rem',
    overflow: 'hidden',

    borderBottomLeftRadius: '2rem',
    borderBottomRightRadius: '2rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',

    transform: 'translateY(0%)',
    opacity: 0.8,
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
})