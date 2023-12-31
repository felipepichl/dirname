import Image from "next/image"

import { HomeContainer, Product } from "@/styles/pages/home"

import shirt1 from '@/assets/camisetas/1.png'
import shirt2 from '@/assets/camisetas/2.png'
import shirt3 from '@/assets/camisetas/3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        
        <Image 
          src={shirt1} 
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
