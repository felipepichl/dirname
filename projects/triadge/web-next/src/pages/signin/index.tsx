import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "@/contexts/AuthContext"

import { styled } from "@/styles"


const Button = styled('button', {
  backgroundColor: '$triadge'
})

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const { signIn } = useContext(AuthContext)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = {
      email, 
      password
    }

    await signIn(data)
  }

 return (
  <form onSubmit={handleSubmit}>
    <input 
      type="email" 
      value={email} 
      onChange={e => setEmail(e.target.value)} 
    />
    <input 
      type="password" 
      value={password} 
      onChange={e => setPassword(e.target.value)} 
    />
    <Button type="submit" >Entrar</Button>
  </form>
 )
}