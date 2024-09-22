import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { BarsArrowUpIcon, ArrowLongUpIcon } from '@heroicons/react/24/outline'
import RemoveProduct from './remove-product'
import EditProduct from './edit-product'
import { useUser } from '@/context/userContext'
import dayjs from "dayjs";

export default function Table() {
  const { user } = useUser()

  

  return (
    <>
      <div className="w-full bg-zinc-100 flex justify-between">
        <div className='flex gap-5'>
          <div className='flex justify-center items-center gap-2'>
            <p className='text-[16px] leading-normal underline'>Mais recentes primeiro</p>
            <BarsArrowUpIcon  className='w-[14px] h-[14px]'/>
          </div>
          <div className='flex justify-center items-center'>
            <p className='text-[16px] leading-normal underline'>De A a Z</p>
            <ArrowLongUpIcon  className='w-[14px] h-[14px]'/>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <p className='text-[14px] font-medium leading-normal'>Mostrando Resultados 1 - 10 de 10 </p>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div>
        <table className='min-w-full table-auto'>
          <thead>
            <tr>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left">Data de Cadastro</th>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left">Nome</th>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left">Valor unitário</th>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left">Quantidade</th>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left">Valor total</th>
              <th className="text-[14px] font-bold leading-normal px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {user?.products.map((product) => (
              <tr key={product.id} className='border-b border-gray-200'>
                <td className='text-[14px] leading-normal px-4 py-6'>{dayjs(product.created_at).format('DD/MM/YYYY')}</td>
                <td className='text-[14px] leading-normal px-4 py-6'>{product.name}</td>
                <td className='text-[14px] leading-normal px-4 py-6'>{(product.price).toLocaleString('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                })}</td>
                <td className='text-[14px] leading-normal px-4 py-6'>{product.quantity}</td>
                <td className='text-[14px] leading-normal px-4 py-6'>
                  {(product.price * product.quantity).toLocaleString('pt-BR', {
                    style: "currency",
                    currency: "BRL"
                })}</td>
                <td className='text-[14px] leading-normal px-4 py-6'>
                  <div className='flex gap-3'>
                    <EditProduct selectedProduct={product} />
                    <RemoveProduct selectedProduct={product} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  </>
  )
}