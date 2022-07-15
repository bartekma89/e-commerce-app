import Link from 'next/link'
import { ShoppingCartIcon } from '@heroicons/react/outline'

import { useCartState } from '@/context/CartStateContext'

function CartBar() {
  const cartState = useCartState()

  return (
    <div className=" p-2 ml-4 flow-root lg:ml-6">
      <Link href="/cart">
        <a className="group -m-2 p-2 flex items-center">
          <ShoppingCartIcon
            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-white"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-white">{cartState.items.length}</span>
        </a>
      </Link>
    </div>
  )
}

export default CartBar