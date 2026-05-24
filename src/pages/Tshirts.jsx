import { Link } from 'react-router-dom'
import printProducts from '../data/printProducts'

export default function Tshirts() {

  const shirts = printProducts.filter(
    item => item.category === 'tshirts'
  )

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <h1 className="text-7xl font-black mb-16">
        T-Shirts
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {shirts.map(product => (

          <Link
            key={product.id}
            to={`/print/product/${product.id}`}
            className="bg-[#111] rounded-3xl overflow-hidden border border-[#222]"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />

            <div className="p-8">

              <h2 className="text-3xl font-bold mb-4">
                {product.name}
              </h2>

              <p className="text-yellow-500 text-xl">
                Starting at ${product.price}
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}