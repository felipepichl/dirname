import React, { useState } from 'react'
import { Platform, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MotiView } from 'moti'

// import Lottie from 'lottie-react-native'
// import animationData from '@assets/hamburger.json'

import { ButtonBack } from '@components/ButtonBack'
import { Photo } from '@components/Photo'
import { InputPrice } from '@components/InputPrice'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { 
  Container,
  Header,
  Title,
  DeleteLable, 
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCaracters,
} from './styles'

export function Product() {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizeP, setPriceSizeP] = useState('')
  const [priceSizeM, setPriceSizeM] = useState('')
  const [priceSizeG, setPriceSizeG] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    } 
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <ButtonBack />

          <Title>Cadastrar</Title>
            
            <TouchableOpacity>
              <DeleteLable>Deletar</DeleteLable>
            </TouchableOpacity>
        </Header>

        <Upload>

          {/* {
            image === '' ? (
              <Lottie
                source={animationData}
                loop
                autoPlay
                style={{
                  height: 160,
                  width: 160
                }}
              />
            ) : (
              <Photo uri={image}/>
            )
          } */}

          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input 
              type='secondary'
              onChangeText={setName}
              value={name}
            />
          </InputGroup>
          
          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>0 de 90 caracteres</MaxCaracters>
            
            </InputGroupHeader>
            <Input 
              multiline
              maxLength={90}
              style={{ height: 80 }}
              type='secondary'
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e Preços</Label>
            
            <MotiView
              from={{ translateX: -100, opacity: 0 }} // Começa fora da tela (esquerda)
              animate={{ translateX: 0, opacity: 1 }} // Anima para a posição original
              transition={{ type: 'timing', duration: 1000 }}
            >
              <InputPrice 
                size='P' 
                onChangeText={setPriceSizeP}
                value={priceSizeP}  
              />
            </MotiView>
            <MotiView
                from={{ translateX: 100, opacity: 0 }}   // 'M' começa à direita
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 1000, delay: 200 }}
            >
              <InputPrice 
                size='M' 
                onChangeText={setPriceSizeM}
                value={priceSizeM}  
              />
            </MotiView>
            <MotiView
                from={{ translateX: -100, opacity: 0 }}  // 'G' começa à esquerda
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 1000, delay: 400 }}
            >
              <InputPrice 
                size='G' 
                onChangeText={setPriceSizeG}
                value={priceSizeG}  
              />
            </MotiView>
          </InputGroup>

          <Button
            title='Cadastrar'
            type='secondary'
            isLoading={isLoading}
          />

        </Form>
      </ScrollView>
    </Container>
  )
}