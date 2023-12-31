import Image from "next/image"

import {Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { HomeContainer, Product } from "@/styles/pages/home"

import ilustration1 from '@/assets/ilustration/camisetas/1.png'
import ilustration2 from '@/assets/ilustration/camisetas/2.png'
import ilustration3 from '@/assets/ilustration/camisetas/3.png'
import ilustration4 from '@/assets/ilustration/ilustration4.png'

const data = [ilustration1, ilustration2, ilustration3, ilustration4]

export default function Home() {
  

  return (
    <HomeContainer>
        <Swiper
          slidesPerView={1}
          pagination={{clickable: true}}
          navigation
        >
        {
          data.map(item => (
            <SwiperSlide key={item.src}>
              <Product >
                <Image 
                  src={item.src} 
                  width={520} 
                  height={480}
                  alt=""
                  layout="responsive"
                  objectFit="cover"
                />
                
                <footer>
                  <strong>BellaFity - Prettier</strong>
                  <span>R$ 79,99</span>
                </footer>
              </Product>
            </SwiperSlide>
          ))
        }
        </Swiper>
    </HomeContainer>
  )
}
