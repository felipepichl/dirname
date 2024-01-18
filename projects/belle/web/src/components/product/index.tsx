import Image from "next/image"

import { Container } from "./styles"

type ProductPros = {
  image: string,
  description: string,
  price: string,
}

export function Product({image, description, price}: ProductPros) {
  return (
    <Container>
      <Image 
        src={image} 
        layout="responsive"
        width={520} 
        height={480}
        alt=""
        objectFit="cover"
      /> 

      <footer>
        <strong>{description}</strong>
        <span>R$ {price}</span>
      </footer>
    </Container>
  )
}