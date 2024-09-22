import { api } from "@/axios/api";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/userContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import dayjs from "dayjs";

export default function NewProduct() {
  const [qtd, setQtd] = useState(1)

  const { user } = useUser()

  const currentDate = new Date().toLocaleString()

  const increaseQtd = () => {
    setQtd(qtd + 1)
  };

  const decreaseQtd = () => {
    if (qtd != 1) {
      setQtd(qtd - 1)
    }
  }

  async function newProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    await api.post('product', {
      userId: user?.id,
      name: formData.get('name') ,
      price: Number(formData.get('price')) ,
      quantity: Number(formData.get('quantity')),
      // created_at: formattedCreatedAt
    }).then(() => {
      toast.success('Produto criado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    }).catch(() => {
      toast.error('Erro ao criar o produto!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    })
  }


  return (
    <Dialog>
      <DialogTrigger className="bg-teal-700 w-[232px] h-12 mx-20 mt-12 text-white px-4 py-3 rounded transition-colors hover:bg-teal-600">
        <button className="flex gap-3 justify-center items-center">
        <PlusIcon className='w-[14px] h-[14px] font-medium'/>
        Cadastrar novo produto
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo produto</DialogTitle>
          <DialogDescription>
            <div className="border-b border-gray-200" />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={newProduct} className="mt-12">
          <div className="flex flex-col gap-2">
            <Label htmlFor="created_at">Data de cadastro:</Label>
            <Input name="created_at" defaultValue={dayjs(currentDate).format('YYYY/MM/DD')} readOnly type="date" className="w-[200px] border-2 border-x-0 border-t-0"/>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="name">Nome do produto:</Label>
              <Input name="name" type="text" className="w-[317px] h-8 px-4 py-[6,5px]"/>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="quantity">Quantidade:</Label>
              <div className="flex justify-center items-center  h-8 border-2 p-1 border-teal-700 gap-4 rounded-sm">
                <button type="button" onClick={decreaseQtd} className="font-bold text-teal-700  flex items-center justify-center w-8 h-8"><MinusIcon /></button>
                  <Input name="quantity" value={qtd} readOnly className="border-0 bg-transparent text-center focus:outline-none" />
                <button type="button" onClick={increaseQtd} className="font-bold text-teal-700 flex items-center justify-center w-8 h-8"><PlusIcon /></button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Label htmlFor="price">Valor R$</Label>
            <Input name="price" type="text" className="w-[200px] h-8 px-4 py-[6,5px]"/>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose>
              <button className="text-[14px] font-medium leading-normal">Cancelar</button>
            </DialogClose>
            <button className="bg-teal-700 text-white flex justify-center items-center px-4 py-3 rounded-sm w-[94px] h-8 text-[14px] font-medium leading-normal transition-colors hover:bg-teal-600">
              Cadastrar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}