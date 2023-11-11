import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'

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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 340,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100,
      }}
    >
      <TextInput />
      <Button title="Entrar" type="submit" />
    </form>
  )
}
