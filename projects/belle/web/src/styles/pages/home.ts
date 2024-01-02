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

    transform: 'translateY(110%)',
    opacity: 0,
    // transform: 'translateY(0%)',
    // opacity: 1,
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

export const ProductFooter = styled('footer', {
  position: 'absolute',
  // bottom: '0.25rem',
  // left: '0.25rem',
  // right: '0.25rem',
  padding: '4rem',
  overflow: 'hidden',

  borderBottomLeftRadius: '2rem',
  borderBottomRightRadius: '2rem',

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
})

export const Container = styled('div', {
  maxWidth: '124rem',
  padding: '8rem 2rem 0',
  margin: '0 auto',

  '.swiper-slide': {
    width: '52.571rem',
    height: '52.571rem',
    position: 'relative',
  },
  
  '.swiper-slide img': {
    width: '52.571rem',
    height: '52.571rem',
    borderRadius: '2rem',
    objectFit: 'cover',
  },

  '.swiper-3d': {
    perspective: 1020,
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
      objectFit: 'contain',
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