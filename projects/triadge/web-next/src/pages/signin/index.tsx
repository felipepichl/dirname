import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'

import signInBackground from '@/assets/sign-up-background.png'

import {
  Container,
  Content,
  Background,
  AnimationContainer,
} from '@/styles/pages/signin'

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form>
            <h1>Faça seu login</h1>

            <TextInput name="email" />
            <TextInput name="password" />

            <Button title="Entrar" />
          </form>
        </AnimationContainer>
      </Content>

      <Background src={signInBackground} alt="" width={780} height={840} />
    </Container>
  )
}
