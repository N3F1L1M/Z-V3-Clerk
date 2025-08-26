import { currentUser } from "@clerk/nextjs/server";

//FUNCION PRINCIPAL
const page = async () => {
  const user = await currentUser();
  console.log(user);

  return (
    <div>

      <div>
        Bienvenido { user?.username?.replace(/_/g, " ") // guiones bajos → espacios
            .replace(/\b\w/g, (c) => c.toUpperCase()) // primera letra en mayúscula
        }</div>
      

      <div className="h-50 w-100 bg-[#a9350b] border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
      <div className="h-50 w-100 bg-amber-500 border-emerald-500 border-8"></div>
    </div>
  );
};

export default page;
//FUNCION PRINCIPAL
