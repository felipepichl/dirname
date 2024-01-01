import { styled } from '..'

export const HomeContainer = styled('main', {
  // display: 'flex',
  // alignContent: 'center',
  // width: '100%',
  // maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  // marginLeft: 'auto',

  // minHeight: 'calc(100vh - 4rem)', 
  padding: '8rem 2rem 0',

  // '@media (max-width: 600px)': {
  //   minHeight: 'auto', 
  // },
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

export const Container = styled('div', {
  maxWidth: '124rem',
  padding: '8rem 2rem 0',
  margin: '0 auto',

  // img: {
  //   width: 520,
  //   height: 520,
  //   borderRadius: '2rem',
  //   objectFit: 'cover',
  // },

  '.swiper-slide': {
      width: '37rem',
      height: '42rem',
      position: 'relative',
  },

  '.swiper-slide img': {
    width: '37rem',
    height: '42rem',
    borderRadius: '2rem',
    objectFit: 'cover',
  },

  '.swiper-slide-shadow-left, .swiper-slide-shadow-right': {
    display: 'none'
  },

  
  '@media (max-width: 500px)': {
    '.swiper_container': {
      height: '47rem',
    },
    
    '.swiper-slide': {
      width: '28rem !important',
      height: '36rem !important',
    },
    
    '.swiper-slide img': {
      width: '28rem !important',
      height: '36rem !important',
    },
  },

  '@media (max-width: 990px)': {
    '.slider-controler .swiper-button-next': {
      left: '70% !important',
      transform: 'translateX(-70%) !important',
    },
    '.slider-controler .swiper-button-prev': {
      left: '30% !important',
      transform: 'translateX(-30%) !important',
    }
  },
  
  '@media (max-width: 450px)': {
    '.slider-controler .swiper-button-next': {
      left: '80% !important',
      transform: 'translateX(-80%) !important',
    },
    '.slider-controler .swiper-button-prev': {
      left: '20% !important',
      transform: 'translateX(-20%) !important',
    }
  },
})