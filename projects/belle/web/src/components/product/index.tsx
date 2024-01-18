import Image from "next/image"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import {Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import { Container, Content } from "./styles"

type ProductProps = {
  data: {
    id: number,
    image: string,
    description: string,
    price: string,
  }[]
}

export function Product({ data }: ProductProps) {
  return (
    <Container>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
      >
        {
          data.map(item => (
            <SwiperSlide key={item.id}>
              <Content>
                <Image 
                  src={item.image} 
                  layout="responsive"
                  width={520} 
                  height={480}
                  alt=""
                  objectFit="cover"
                /> 
                <footer>
                  <strong>{item.description}</strong>
                  <span>R$ {item.price}</span>
                </footer>
              </Content> 
            </SwiperSlide>  
          ))
        }

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <FaArrowLeft color="#222224"/>
          </div>
          <div className="swiper-button-next slider-arrow">
            <FaArrowRight color="#222224"/>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </Container>
  )
}