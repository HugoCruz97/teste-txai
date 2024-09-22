import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { TrashIcon as TrashSolid } from "@heroicons/react/24/solid";
import { Product, useUser  } from '../../context/userContext'
import { api } from "@/axios/api";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface EditProductProps {
  selectedProduct: Product
}

export default function RemoveProduct({selectedProduct}: EditProductProps) {
  const { user } = useUser()

  async function removeProduct() {
    
    await api.delete(`product/${user?.id}/${selectedProduct.id}`, {
    }).then(() => {
      toast.success('Produto removido com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    }).catch(() => {
      toast.error('Erro ao remover o produto!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    })
  }

  return(
    <Dialog>
      <DialogTrigger>
        <button className="flex justify-center items-center">
          <TrashIcon className='w-[14px] h-[14px] text-red-500 transition-colors hover:text-red-600' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex justify-center items-center">
            <TrashSolid className="w-7 h-7 text-white" />
          </div>
        </DialogHeader>
        <p className="w-[447px] h-[23px] text-[20px] font-semibold leading-normal flex justify-center items-center mt-11">Você tem certeza que deseja excluir esse item?</p>
        <div className="flex justify-center items-center gap-4 mt-8">
         <DialogClose>
          <button className="w-[211px] h-8 px-4 py-2 font-medium leading-normal text-[14px] flex justify-center items-center">
            Cancelar
          </button>
         </DialogClose>
          <button onClick={() => {removeProduct()}} className="w-[211px] h-8 px-4 py-2 bg-red-600 rounded-sm text-white font-medium leading-normal text-[14px] flex justify-center items-center transition-colors hover:bg-red-500">
            Excluir
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}