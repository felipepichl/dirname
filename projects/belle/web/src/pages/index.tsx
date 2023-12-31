import Image from "next/image"

import { HomeContainer, Product } from "@/styles/pages/home"

import ilustration1 from '@/assets/ilustration/ilustration1.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        
        <Image 
          src={ilustration1} 
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
    </HomeContainer>
  )
}
