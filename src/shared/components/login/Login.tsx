import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts"
import { useState } from "react"
import * as yup from 'yup'




interface ILoginProps {
  children: React.ReactNode
}


const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4)
})


export const Login: React.FC<ILoginProps> = ({children}) => {
  
  const { isAuthenticated, login } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  
  
  const handleSubmit = () => {
    setIsLoading(true)

    loginSchema.validate({ email, password }, {abortEarly: false})
    .then(dataValited => {
      login(dataValited.email, dataValited.password)
        .then(() => {
          setIsLoading(false)
        })
    })
    .catch((errors: yup.ValidationError ) => {
      setIsLoading(false)


      errors.inner.forEach(error => {
        if (error.path === 'email') {
          setEmailError(error.message)
        } else if (error.path === 'password') {
           setPasswordError(error.message)
        }
      })

    })
  }

  if (isAuthenticated) return (
    <>{children}</>
  )
  
  return (

    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      
      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={3} width={250} padding={2}>
            <Typography variant="h5" align="center">Identify yourself</Typography>

            <TextField label='Email' type="email" fullWidth value={email} onChange={e => setEmail(e.target.value)}  error={!!emailError} helperText={emailError}  onKeyDown={() => setEmailError('')} disabled={isLoading}/>
            <TextField label='Password' type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} error={!!passwordError} helperText={passwordError} onKeyDown={() => setPasswordError('')} disabled={isLoading}/>

          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center' marginBottom={2}>
            <Button variant="contained" sx={{width: '7rem', padding: '.6rem'}} onClick={handleSubmit} disabled={isLoading} endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate"/> : undefined}>
              Login
            </Button>
          </Box>
        </CardActions>
      </Card> 

    </Box>
  )
}