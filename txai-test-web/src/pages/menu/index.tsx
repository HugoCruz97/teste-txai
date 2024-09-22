import darkLogo from '../../assets/darklogo.svg'
import { Bars3Icon ,QuestionMarkCircleIcon, CalendarDaysIcon, BellIcon, UserCircleIcon} from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import Table from './table'
import NewProduct from './new-product'
import { useUser } from '@/context/userContext'

export default function Menu() {

 const { user } = useUser()

  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-20 px-8 py-6 flex justify-between border-2 border-zinc-200">
        <div className='flex gap-8 items-center'>
          <Bars3Icon className='w-6 h-6' />
          <img src={darkLogo} alt="Logo" className='w-[104px] h-[53px]'/>
        </div>
        <div className='flex gap-6'>
          <div className='flex justify-center items-center gap-1'>
            <QuestionMarkCircleIcon className='w-5 h-5' />
            <p className='text-sm'>Suporte</p>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <CalendarDaysIcon className='w-5 h-5' />
            <p className='text-sm'>Acessar Calendário</p>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <BellIcon className='w-5 h-5 text-teal-700' />
          </div>
          <div className='flex justify-center items-center gap-1'>
            <UserCircleIcon className='w-5 h-5' />
            <p className='text-sm'>{user?.userName}</p>
          </div>
        </div>
      </div>
      <div className='w-[340px] h-12 mt-6 bg-zinc-50'>
        <div className='flex gap-2 justify-center items-center mt-3'>
          <HomeIcon className='w-[14px] h-[14px] text-zinc-400'/>
          <p className='text-[14px] font-medium leading-normal text-zinc-400'>Home</p>
          <p className='text-[14px] font-medium leading-normal text-zinc-400'>/</p>
          <p className='text-[14px] font-medium leading-normal text-zinc-400'>Gestão</p>
          <p className='text-[14px] font-medium leading-normal text-zinc-400'>/</p>
          <p className='text-[14px] font-medium leading-normal text-teal-700'>Controle de estoque</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-3'>
        <p className='text-2xl font-bold'>Controle de Estoque</p>
        <div className='w-[255px] h-0 border-teal-700 border-y-2' />
      </div>
        <NewProduct />
      <div className='mt-14 mx-20'>
        <Table />
      </div>
    </div>
  )
}