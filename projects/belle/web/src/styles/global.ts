import { globalCss } from '.'

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const globalStyles = globalCss({
  '*, *::before, *::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    listStyleType: 'none'
  },

  'html': {
    fontSize: '62.5%',
    scrollBehavior: 'smooth',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    'webkit-font-smoothing': 'antialiased',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '1.6rem'
  },

  '@media (min-width: 1440px)': {
    'html': {
      zoom: 1.5,
    }
  },

  '@media (min-width: 2560px)': {
    'html': {
      zoom: 1.7,
    }
  },
  
  '@media (min-width: 3860px)': {
    'html': {
      zoom: 2.5,
    }
  },

  // '::-webkit-scrollbar': {
  //   width: '1.3rem',
  // },
  
  // '::-webkit-scrollbar-thumb': {
  //   borderRadius: '1rem',
  //   backgroundColor: '#797979',
  //   transition: 'all 0.5s ease-in-out',
  // },

  // '::-webkit-scrollbar-thumb:hover': {
  //   background: '#222224',
  // },
  
  // '::-webkit-scrollbar-track': {
  //   background: '#f9f9f9',
  // },

  // 'body, input, textarea, button': {
  //   fontFamily: 'Roboto',
  //   fontWeight: 'bold',
  //   fontSize: '1.6rem'
  // },

  // '.container': {
  //   maxWidth: '124rem',
  //   // padding: '4rem 1rem',
  //   padding: '8rem 2rem 0',
  //   margin: '0 auto',
  // },
  
  // '.swiper_container': {
  //   height: '52rem',
  //   padding: '2rem 0',
  //   position: 'relative',
  // },
  
  // '.swiper-slide': {
  //   width: '37rem',
  //   height: '42rem',
  //   position: 'relative',
  // },

  // '@media (max-width: 500px)': {
  //   '.swiper_container': {
  //     height: '47rem',
  //   },
    
  //   '.swiper-slide': {
  //     width: '28rem !important',
  //     height: '36rem !important',
  //   },
    
  //   '.swiper-slide img': {
  //     width: '28rem !important',
  //     height: '36rem !important',
  //   },
  // },

  // '.swiper-slide img': {
  //   width: '37rem',
  //   height: '42rem',
  //   borderRadius: '2rem',
  //   objectFit: 'cover',
  // },
    
  // '.swiper-slide-shadow-left, .swiper-slide-shadow-right': {
  //   display: 'none'
  // },
  
  // '.slider-controler': {
  //   position: 'relative',
  //   bottom: '2rem',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  
  // '.slider-controler .swiper-button-next': {
  //   left: '58% !important',
  //   transform: 'translateX(-58%) !important',
  // },

  // '@media (max-width: 990px)': {
  //   '.slider-controler .swiper-button-next': {
  //     left: '70% !important',
  //     transform: 'translateX(-70%) !important',
  //   },
  //   '.slider-controler .swiper-button-prev': {
  //     left: '30% !important',
  //     transform: 'translateX(-30%) !important',
  //   }
  // },
  
  // '@media (max-width: 450px)': {
  //   '.slider-controler .swiper-button-next': {
  //     left: '80% !important',
  //     transform: 'translateX(-80%) !important',
  //   },
  //   '.slider-controler .swiper-button-prev': {
  //     left: '20% !important',
  //     transform: 'translateX(-20%) !important',
  //   }
  // },

  // '.slider-controler .slider-arrow': {
  //   background: 'var(--white)',
  //   width: '3.5rem',
  //   height: '3.5rem',
  //   borderRadius: '50%',
  //   left: '42%',
  //   transform: 'translateX(-42%)',
  //   filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
  // },
  
  // '.slider-controler .slider-arrow ion-icon': {
  //   fontSize: '2rem',
  //   color: '#222224',
  // },
  
  // '.slider-controler .slider-arrow::after': {
  //   content: '',
  // },
  
  // '.swiper-pagination': {
  //   position: 'relative',
  //   width: '15rem !important',
  //   bottom: '1rem',
  // },
  
  // '.swiper-pagination .swiper-pagination-bullet': {
  //   filter: 'drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1))',
  // },
  
  // '.swiper-pagination .swiper-pagination-bullet-active': {
  //   background: 'var(--primary)',
  // },
})