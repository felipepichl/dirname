import Image from "next/image"

import {Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import { HomeContainer, Product, Container } from "@/styles/pages/home"

import ilustration1 from '@/assets/ilustration/camisetas/1.png'
import ilustration2 from '@/assets/ilustration/camisetas/2.png'
import ilustration3 from '@/assets/ilustration/camisetas/3.png'
import ilustration4 from '@/assets/ilustration/ilustration4.png'

import slide_image_1 from '@/assets/images/img_1.jpg';
import slide_image_2 from '@/assets/images/img_2.jpg';
import slide_image_3 from '@/assets/images/img_3.jpg';
import slide_image_4 from '@/assets/images/img_4.jpg';
import slide_image_5 from '@/assets/images/img_5.jpg';
import slide_image_6 from '@/assets/images/img_6.jpg';
import slide_image_7 from '@/assets/images/img_7.jpg';

const data = [slide_image_1, slide_image_2, slide_image_3, slide_image_4]

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
              {/* <Product > */}
                {/* <Image 
                  src={item.src} 
                  width={520} 
                  height={480}
                  alt=""
                  layout="responsive"
                  objectFit="cover"
                /> */}
                
                <img src={item.src} alt=""/>

                {/* <footer>
                  <strong>BellaFity - Prettier</strong>
                  <span>R$ 79,99</span>
                </footer>
              </Product> */}
            </SwiperSlide>
          ))
        }
        </Swiper>
      </Container>
  )
}
