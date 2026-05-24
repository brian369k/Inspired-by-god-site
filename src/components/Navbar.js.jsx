import { Link } from 'react-router-dom'

export default function Navbar() {

  return (

    <header className="sticky top-0 z-50 bg-black border-b border-[#1a1a1a]">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-[90px] flex items-center justify-between">

          <Link
            to="/"
            className="text-2xl font-black tracking-[0.3em]"
          >
            IBG
          </Link>


          <nav className="hidden md:flex items-center gap-10 text-sm uppercase">

            <Link to="/print">
              Print
            </Link>

            <Link to="/print/tshirts">
              T-Shirts
            </Link>

            <Link to="/print/polos">
              Polos
            </Link>

            <Link to="/print/hoodies">
              Hoodies
            </Link>

            <Link to="/print/hats">
              Hats
            </Link>

          </nav>


          <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-black">

            REQUEST QUOTE

          </button>

        </div>

      </div>

    </header>
  )
}