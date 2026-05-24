import { Link, useParams } from 'react-router-dom'
import printProducts from '../data/printProducts'

export default function CategoryPage() {

  const { category } = useParams()

  const filteredProducts = printProducts.filter(
    item => item.category === category
  )

  return (

    <div className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-7xl mx-auto">


        <div className="mb-20">

          <p className="text-yellow-500 uppercase tracking-[0.4em] text-xs mb-6">
            Inspired By God Print Division
          </p>


          <h1 className="text-7xl font-black capitalize">
            {category}
          </h1>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {filteredProducts.map((product) => (

            <Link
              key={product.id}
              to={`/print/product/${product.id}`}
              className="group bg-[#111] border border-[#222] rounded-[32px] overflow-hidden hover:border-yellow-500 transition duration-300"
            >

              <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a]">

                <img
                  src={product.colors[0].image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>


              <div className="p-8">

                <h2 className="text-3xl font-black mb-3">
                  {product.name}
                </h2>


                <p className="text-yellow-500 text-xl mb-4">
                  Starting at ${product.price}
                </p>


                <p className="text-white/60">
                  Fully customizable premium apparel
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  )
}