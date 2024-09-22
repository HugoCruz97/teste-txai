import { Input } from '@/components/ui/input'
import darkLogo from '../../assets/darklogo.svg'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { api } from '@/axios/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  async function createNewUser(event: FormEvent) {
    event.preventDefault()

    await api.post('user', {
      name,
      cpf,
      email,
      userName,
      password,
      role
    }).then(() => {
      toast.success('Usuário criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
      navigate('/')
    }).catch(() => {
      toast.error('Erro ao criar usuário!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    })
  }

  return (
  <div className="h-screen flex flex-col px-[203px] py-[110px]">
    <div>
      <img className='w-[130px] h-[50px]' src={darkLogo} alt="Logo" />
    </div>
    <div className='mt-4'>
      <p className='font-bold text-[28px] leading-10'>Faça seu cadastro</p>
      <p className='text-[12px] leading-6 tracking-wide text-zinc-300'>*Campos obrigatórios</p>
    </div>
    <div className='flex gap-2 mt-10'>
      <p className='bg-blue-600 rounded-full flex justify-center items-center w-[52px] h-[52px] font-bold text-[40px] text-white leading-[60px]'>S</p>
      <p className='mt-7 text-[14px] leading-6 tracking-wide text-teal-700'>Carregar foto</p>
    </div>

    <form onSubmit={createNewUser} className='mt-16'>
      <div className='flex gap-5'>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*Nome completo</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className='border w-[329px] h-10 focus:border-teal-700 p-2' placeholder='Insira seu nome completo' />
        </div>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*CPF</Label>
          <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} className='border w-[329px] h-10 focus:border-teal-700 p-2' placeholder='Insira seu CPF, somente os números'/>
        </div>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>E-mail</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border w-[329px] h-10 focus:border-teal-700 p-2' placeholder='Insira seu melhor e-mail'/>
        </div>
      </div>  
      <div className='flex gap-5 mt-11'>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*Nome de usuário</Label>
          <Input id="user_name" value={userName} onChange={(e) => setUserName(e.target.value)} className='border w-[329px] h-10 focus:border-teal-700 p-2' />
        </div>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*Senha</Label>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} className='border w-[329px] h-10 focus:border-teal-700 p-2'/>
        </div>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*Confirmar senha</Label>
          <Input className='border w-[329px] h-10 focus:border-teal-700 p-2'/>
        </div>
      </div>  
      <div className='flex gap-5 mt-11'>
        <div>
          <Label className='text-[14px] leading-6 tracking-wide'>*Cargo</Label>
          <Select name='role' onValueChange={(value) => setRole(value)} >
            <SelectTrigger className='w-[329px] px-[8px] py-[10px] text-zinc-400 focus:border-teal-700'>
              <SelectValue placeholder="Selecione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='admin'>Administrador</SelectItem>
              <SelectItem value='user'>Usuário</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='flex items-center ml-[720px]'>
        <div className='flex items-center gap-2'>
          <ArrowUturnLeftIcon className='w-[14px] h-[14px] text-zinc-300' />
          <p onClick={() => navigate('/')} className='text-[14px] leading-6 tracking-wide text-zinc-300 cursor-pointer transition-colors hover:text-zinc-400'>Voltar ao Login</p>
        </div>
        <div className='ml-8'>
          <Button type='submit' className='bg-teal-700 text-white px-4 py-3 rounded-sm flex justify-center items-center w-[143px] h-10 transition-colors hover:bg-teal-600'>Concluir cadastro</Button>
        </div>
      </div>
    </form>
  </div>
  )
}