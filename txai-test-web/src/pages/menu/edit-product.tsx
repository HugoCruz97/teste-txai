import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { Product, useUser  } from '../../context/userContext'
import dayjs from "dayjs";
import { api } from "@/axios/api";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface EditProductProps {
  selectedProduct: Product
}

export default function EditProduct({selectedProduct}: EditProductProps) {
  const [qtd, setQtd] = useState(selectedProduct.quantity)

  const { user } = useUser()

  const increaseQtd = () => {
    setQtd(qtd + 1)
  };

  const decreaseQtd = () => {
    if (qtd != 1) {
      setQtd(qtd - 1)
    }
  }

  async function editProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const rawCreatedAt = formData.get('created_at');
    const createdAt = (typeof rawCreatedAt === 'string' && rawCreatedAt)
    ? dayjs(rawCreatedAt).toISOString() 
    : dayjs().toISOString();

    await api.put(`product/${user?.id}/${selectedProduct.id}`, {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
      created_at: createdAt
    }).then(() => {
      toast.success('Produto editado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
      setTimeout(() => window.location.reload(),1000)
    }).catch(() => {
      toast.error('Erro ao editar o produto!', {
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
          <Cog6ToothIcon className='w-[14px] h-[14px] text-teal-700 transition-colors hover:text-teal-600' />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold leading-normal">Gerenciar produto</DialogTitle>
          <DialogDescription>
            <div className="border-b border-gray-200" />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={editProduct} className="mt-12">
          <div className="flex flex-col gap-2">
            <Label htmlFor="created_at">Data de cadastro:</Label>
            <Input defaultValue={dayjs(selectedProduct.created_at).format('YYYY-MM-DD')} type="date" name="created_at" className="w-[200px] border-2 border-x-0 border-t-0"/>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="name">Nome do produto:</Label>
              <Input defaultValue={selectedProduct.name} type="text" name="name" className="w-[317px] h-8 px-4 py-[6,5px]"/>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="quantity">Quantidade:</Label>
              <div className="flex justify-center items-center  h-8 border-2 p-1 border-teal-700 gap-4 rounded-sm">
                <button type="button" onClick={decreaseQtd} className="font-bold text-teal-700  flex items-center justify-center w-8 h-8"><MinusIcon /></button>
                  <Input value={qtd} name="quantity" readOnly className="border-0 bg-transparent text-center focus:outline-none" />
                <button type="button" onClick={increaseQtd} className="font-bold text-teal-700 flex items-center justify-center w-8 h-8"><PlusIcon /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Label htmlFor="price">Valor R$</Label>
            <Input defaultValue={selectedProduct.price} type="text" name="price" className="w-[200px] h-8 px-4 py-[6,5px]"/>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose>
              <button className="text-[14px] font-medium leading-normal">Cancelar</button>
            </DialogClose>
            <button className="bg-teal-700 text-white flex justify-center items-center px-4 py-3 rounded-sm w-[94px] h-8 text-[14px] font-medium leading-normal transition-colors hover:bg-teal-600">
              Atualizar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}