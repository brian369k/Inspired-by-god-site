import { Link } from 'react-router-dom'

const categories = [

  {
    title: 'T-Shirts',
    image: '/mockups/tee-front-black.jpg',
    link: '/print/tshirts'
  },

  {
    title: 'Polos',
    image: '/mockups/polo-front-black.png',
    link: '/print/polos'
  },

  {
    title: 'Hoodies',
    image: '/mockups/hoodie-front-black.png',
    link: '/print/hoodies'
  },

  {
    title: 'Hats',
    image: '/mockups/hat-front-black.png',
    link: '/print/hats'
  }

]

export default function PrintHome() {

  return (

    <div className="min-h-screen bg-black text-white">

      <section className="px-6 pt-24 pb-20 border-b border-[#1a1a1a]">

        <div className="max-w-7xl mx-auto">

          <p className="text-yellow-500 uppercase tracking-[0.4em] text-xs mb-6">
            Inspired By God Print Division
          </p>


          <h1 className="text-7xl md:text-8xl font-black leading-none max-w-5xl mb-10">
            Premium Apparel Printing For Brands & Businesses
          </h1>


          <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
            Upload your logo, customize placement, preview products live, and request premium apparel printing directly online.
          </p>

        </div>

      </section>


      <section className="px-6 py-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {categories.map((item) => (

            <Link
              key={item.title}
              to={item.link}
              className="group bg-[#111] border border-[#222] rounded-[32px] overflow-hidden hover:border-yellow-500 transition duration-300"
            >

              <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a]">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

              </div>


              <div className="p-8">

                <h2 className="text-3xl font-black mb-3">
                  {item.title}
                </h2>


                <p className="text-white/60">
                  Premium customizable apparel printing
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </div>

  )
}