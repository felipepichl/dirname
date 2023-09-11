import React, { useState } from 'react'
import { Platform, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { MotiView } from 'moti'

import { Easing } from 'react-native-reanimated'

import { Header } from '@components/Header'
import { InputPrice } from '@components/InputPrice'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { 
  Container,
  Content,
  CenteredContainer,
  Form,
  Separator,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCaracters,
} from './styles'

export function ProductBase() {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [priceSizeP, setPriceSizeP] = useState('')
  const [priceSizeM, setPriceSizeM] = useState('')
  const [priceSizeG, setPriceSizeG] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const initialTranslate = (Dimensions.get('window').width * 0.9) / 2;

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
      <Header 
        title='Cadastrar'
      />
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          minHeight: Dimensions.get('window').height
        }}
      >
        <CenteredContainer>
          <Form>
            <MotiView
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
              
            >
              <InputGroup isPriceGroup={false}>
                <Label>Nome</Label>
                <Input 
                  type='secondary'
                  onChangeText={setName}
                  value={name}
                />
              </InputGroup>
            </MotiView>

            <InputGroup isPriceGroup={false}>
            <MotiView
              from={{ translateY: 100, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, delay: 400, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            >
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
            </MotiView>
              </InputGroup>
            
            <InputGroup isPriceGroup>
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

          </Form>

          <MotiView
            from={{ scaleX: 0 }}  // Começa do meio
            animate={{ scaleX: 1 }}  // Anima até o tamanho original
            transition={{ 
              type: 'timing', 
              duration: 2000,  // Duração de 2 segundos
              delay: 1400,    // Começa após 1.4 segundos
              easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
            }}
          >
            <Separator />
          </MotiView>

          <MotiView
            from={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ type: 'timing', duration: 1000, delay: 1200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }}
            style={{ margin: 24 }} 
          >
            <Button
              title='Cadastrar'
              type='secondary'
              isLoading={isLoading}
            /> 
          </MotiView>
        </CenteredContainer>
      </Content>
    </Container>
  )
}