import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export interface User{
  id: number,
  email: string,
  password: string,
  name: string,
  role: string
}

export default function Header({setCity}:{
  setCity: string
}) {
  const [user, setUser] = useState<User>()

  
  useEffect(() => {
    fetch(`http://localhost:8084/api/user/byemail/${localStorage.getItem('user')}`)
        .then((response) => response.json())
        .then((data) => setUser(data));
  }, [])
  
  return (
    <header>
      <div className="flex flex-row justify-around p-4">
        <Link to={"/"}>
          <h1 className="font-rowdies text-blue-600 text-4xl">
            ng<span className="text-yellow-400">IN</span>ep
          </h1>
        </Link>
        <div className="flex gap-4 justify-center items-center">
          <select name="" id="" className="font-bold p-2 w-32 focus:outline-none" onChange={(e) => setCity(e.target.value)}>
            <option value="Jakarta">Jakarta</option>
            <option value="Bandung">Bandung</option>
            <option value="Yogyakarta">Yogyakarta</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Medan">Medan</option>
          </select>
          {user ? (
            <div className="font-rowdies">Selamat Datang {user.name}</div>
          ) : (
            <div className="flex flex-row gap-4">
              <Link to={"/register"} className="text-black border-2 border-black p-1 font-rowdies w-28 text-sm rounded-lg h-8 flex justify-center items-center">
                Daftar
              </Link>
              <Link to={"/login"} className=" bg-blue-600 p-1 text-white font-rowdies w-28 text-sm rounded-lg h-8 flex justify-center items-center">
                Masuk
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
