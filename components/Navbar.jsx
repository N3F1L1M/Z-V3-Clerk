"use client";

import { UserButton,useUser} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {


   //const { isLoaded, isSignedIn, user } = useUser();

 // if (isLoaded && isSignedIn && user) {

    

    return (
      <nav className="bg-gray-900 text-white px-6 py-4  h-15 top-0 left-0 sticky">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Zcatalogo Administradores</h1>
        {/* <h2 className="text-l font-bold">{user.firstName}</h2> */}
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-400">Inicio</Link></li>
          <li><Link href="/nosotros" className="hover:text-gray-400">Acerca</Link></li>
          <li><Link href="/" className="hover:text-gray-400">Contacto</Link></li>
          <li> <UserButton /> </li> 
        </ul>
      </div>
    </nav>
    )
 // }

  


}

export default Navbar
