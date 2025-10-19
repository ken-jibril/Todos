import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className='bg-blue-900 text-white p-3 flex justify-around items-center'>
       <Link to="/" className="font-bold text-xl ">TaskMaster</Link>
       <Link to="/create" className="font-bold text-xl bg-white text-blue-900 px-3 py-2 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300">Create Todo</Link>
    </nav>
  )
}

export default Navbar