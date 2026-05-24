import Navbar from './Navbar'

export default function Layout({ children }) {

  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />

      {children}

    </div>
  )
}