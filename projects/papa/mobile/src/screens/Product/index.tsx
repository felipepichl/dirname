import React, { useState } from 'react'
import { Platform, TouchableOpacity, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import Lottie from 'lottie-react-native'
import animationData from '@assets/hamburger.json'

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
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input />
          </InputGroup>
          
          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCaracters>0 de 60 caracteres</MaxCaracters>
            
            </InputGroupHeader>
            <Input 
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e Preços</Label>
            
            <InputPrice size='P' />
            <InputPrice size='M' />
            <InputPrice size='G' />
          </InputGroup>

          <Button
            title='Cadastrar'
          />

        </Form>
      </ScrollView>
    </Container>
  )
}