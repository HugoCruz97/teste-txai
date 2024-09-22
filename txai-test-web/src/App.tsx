import logo from './assets/logo.svg'
import { Input } from './components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from './components/ui/checkbox'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { FormEvent } from 'react'
import { useUser } from './context/userContext'

function App() {
  const navigate = useNavigate()

  const { login: loginUser } = useUser()

   async function login(event:FormEvent<HTMLFormElement>) {
      event.preventDefault()

      const cpf = event.currentTarget.cpf.value;
        const password = event.currentTarget.password.value;
        await loginUser(cpf, password).then(() => {
          navigate('/menu')
        }).catch(() => {
          navigate('/')
        })
      
   }


  return (
    <div className="h-screen flex">
      {/* Parte esquerda */}
      <div className="w-1/2 bg-teal-700 flex flex-col gap-5 items-center justify-center">
        <p className="text-white font-bold leading-[60px] text-[40px] ml-48 w-[257px] h-[60px]">Bem-vindo!</p>
        <img src={logo} className='w-[368px] h-[165px] mb-80' alt="Logo da plataforma" />
      </div>

      {/* Parte direita */}
      <div className="w-1/2 flex flex-col gap-3 items-center justify-center">
        <div className='flex'>
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <form onSubmit={login} className='flex flex-col'>
          <div className='flex flex-col'>
            <Label htmlFor="">CPF</Label>
            <Input name="cpf"  type="text" className='border p2- w-[329px] h-10 focus:border-teal-700 p-2' placeholder='Insira seu CPF, somente os números' />
          </div>
          <div className='flex flex-col mt-4'>
            <Label htmlFor="">Senha</Label>
            <Input name="password"  className='border w-[329px] h-10 focus:border-teal-700 p-2' type="password" placeholder='Insira sua senha' />
          </div>
          <div className='flex justify-between mt-4'>
            <div className='flex gap-2 justify-center items-center'>
              <Checkbox className='rounded-md border-teal-100 checked:bg-teal-700' />
              <Label className='text-xs leading-6' htmlFor="">Lembrar minha senha</Label>
            </div>
            <p className='text-teal-700 text-xs leading-6 cursor-pointer transition-colors hover:text-teal-600'>Esqueci minha senha</p>
          </div>
          <button type='submit' className='bg-teal-700 text-white px-4 py-3 rounded-sm flex justify-center items-center w-80 gap-2 mt-6 transition-colors hover:bg-teal-600'>Entrar</button> 
          <div className='flex w-[300px] h-6 pr-[33px] justify-center items-center mt-6'>
            <p className='text-sm leading-6 tracking-wide'>Não tem uma conta? <span onClick={() => navigate('/signup')} className='text-teal-700 cursor-pointer transition-colors hover:text-teal-600'>cadastre-se agora</span></p>
          </div>
          <div className='flex gap-3 justify-center items-center mt-[104px]'>
            <p className='text-sm leading-6 tracking-wide text-zinc-400'>Ajuda</p>
            <div className='w-1 h-1 rounded-full bg-teal-100' />
            <p className='text-sm leading-6 tracking-wide text-zinc-400'>Política de privacidade</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
