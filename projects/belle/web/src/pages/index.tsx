import Image from "next/image"

import {Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import { 
  HomeContainer, 
  Product, 
  ProductFooter, 
  Container 
} from "@/styles/pages/home"

import ilustration1 from '@/assets/ilustration/ilustration1.png'
import ilustration2 from '@/assets/ilustration/ilustration2.png'
import ilustration3 from '@/assets/ilustration/ilustration3.png'
import ilustration4 from '@/assets/ilustration/ilustration4.png'

// const data = [ilustration1, ilustration2, ilustration3, ilustration4]
const data = [ilustration1, ilustration2, ilustration3, ilustration4]

export default function Home() {
  

  return (
      <Container>
        <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        // loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        // pagination={{ el: '.swiper-pagination', clickable: true }}
        // navigation={{
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        //   // clickable: true,
        // }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        // className="swiper_container"
      >
          {
          data.map(item => (
            <SwiperSlide key={item.src}>  
              <Product>
              {/* <Image 
                src={item.src} 
                // layout="responsive"
                width={520} 
                height={480}
                alt=""
                objectFit="cover"
              />  */}

              <img src={item.src} alt="" />
              <footer>
                <strong>BellaFity - Prettier</strong>
                <span>R$ 79,99</span>
              </footer>
              </Product>
            </SwiperSlide>
          ))
        }
        </Swiper>
      </Container>
  )
}

{/* <Product > 
  <Image 
    src={item.src} 
    width={520} 
    height={480}
    alt=""
    layout="responsive"
    objectFit="cover"
  /> 
  
  <img src={item.src} alt=""/>
  
  <footer>
    <strong>BellaFity - Prettier</strong>
    <span>R$ 79,99</span>
  </footer>
*/}
  