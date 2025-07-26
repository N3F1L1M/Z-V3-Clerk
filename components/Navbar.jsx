"use client";

import { UserButton,useUser    } from "@clerk/nextjs";

const Navbar = () => {


   //const { isLoaded, isSignedIn, user } = useUser();

 // if (isLoaded && isSignedIn && user) {

    

    return (
      <nav className="bg-gray-900 text-white px-6 py-4  w-full h-15 top-0 left-0 sticky">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Zcatalogo Administradores</h1>
        {/* <h2 className="text-l font-bold">{user.firstName}</h2> */}
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-gray-400">Inicio</a></li>
          <li><a href="#" className="hover:text-gray-400">Acerca</a></li>
          <li><a href="#" className="hover:text-gray-400">Contacto</a></li>
          {/* <li> <UserButton /> </li> */}
        </ul>
      </div>
    </nav>
    )
 // }

  


}

export default Navbar
