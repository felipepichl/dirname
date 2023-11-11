import { styled } from '@/styles'

export const ButtonContainer = styled('button', {
  background: '$gold700',
  borderRadius: '$md',
  border: 0,
  height: '$12',
  width: '100%',
  marginTop: '$4',
  padding: '0 $4',
  fontSize: '$md',
  fontWeight: '$bold',
  color: '$gray600',

  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    background: '$gold500',
  },
})
