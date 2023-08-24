import React, { useState } from 'react'
import { Platform, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MotiView } from 'moti'

import { Easing } from 'react-native-reanimated'

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
        <MotiView
          from={{ translateY: -100, opacity: 0 }}  // 'Header' começa acima
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: 'timing', duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
        >
          <Header>
            <ButtonBack />

            <Title>Cadastrar</Title>
              
              <TouchableOpacity>
                <DeleteLable>Deletar</DeleteLable>
              </TouchableOpacity>
          </Header>
        </MotiView>

        {/* <Upload>
          {
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
          }

          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
        </Upload> */}

        <Form>
          <MotiView
            from={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 1000, delay: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            
          >
            <InputGroup>
              <Label>Nome</Label>
              <Input 
                type='secondary'
                onChangeText={setName}
                value={name}
              />
            </InputGroup>
          </MotiView>

          <MotiView
            from={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 1000, delay: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
          >
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
          </MotiView>

           
          <InputGroup>
            
            <MotiView 
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            >
              <Label>Tamanhos e Preços</Label>
              <InputPrice 
                size='P' 
                onChangeText={setPriceSizeP}
                value={priceSizeP}  
              />
            </MotiView>
          
            <MotiView 
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 800, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            >
              <InputPrice 
                size='M' 
                onChangeText={setPriceSizeM}
                value={priceSizeM}  
              />
            </MotiView>
          
            <MotiView 
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            >
              <InputPrice 
                size='G' 
                onChangeText={setPriceSizeG}
                value={priceSizeG}  
              />
            </MotiView>
          </InputGroup>

          <MotiView
            from={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 1000, delay: 1200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
          >
            <Button
              title='Cadastrar'
              type='secondary'
              isLoading={isLoading}
            />
          </MotiView>
        </Form>
      </ScrollView>
    </Container>
  )
}