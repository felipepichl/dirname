import { styled } from '@/styles'

export const TextInputContainer = styled('div', {
  background: '$gray700',
  borderRadius: '$md',
  padding: '$4',
  width: 'auto',

  color: '$gray200',

  display: 'flex',
  alignItems: 'center',

  '&+div': {
    marginTop: '$2',
  },

  svg: {
    marginRight: '$4',
  },
})

export const Input = styled('input', {
  background: 'transparent',
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$gray100',
  flex: '1',
  border: 0,

  '&:focus': {
    outline: 0,
  },
})
