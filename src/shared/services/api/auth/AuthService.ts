import { Api } from "../axios-config"



interface IAuth {
  acessToken: string
}


const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {

    const urlRelative = `/auth`
    const { data } = await Api.get(urlRelative, {data: {email, password}})

    if (data) {

      return data

    } else {

      return new Error('Error in login')

    }
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error in login')
  }
}


export const AuthService =  {

  auth,

}