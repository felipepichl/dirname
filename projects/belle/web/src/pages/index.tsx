import ilustration1 from '@/assets/ilustration/ilustration1.png'
import ilustration2 from '@/assets/ilustration/ilustration2.png'
import ilustration3 from '@/assets/ilustration/ilustration3.png'
import ilustration4 from '@/assets/ilustration/ilustration4.png'

import { Product } from '@/components/product'

export default function Home() {
  const data = [
    { 
      id: 1, 
      description: 'Bellafit - Carina', 
      image: ilustration1.src, 
      price: '79.99' 
    },
    { 
      id: 2, 
      description: 'Bellafit - Ammirare', 
      image: ilustration2.src, 
      price: '79.99' 
    },
    { 
      id: 3, 
      description: 'Bellafit - Serenità', 
      image: ilustration3.src, 
      price: '79.99'
    },
    { 
      id: 4, 
      description: 'Bellafit - Curatta', 
      image: ilustration4.src, 
      price: '129.99' 
    }
  ]
  return <Product data={data}/> 
  
}
  