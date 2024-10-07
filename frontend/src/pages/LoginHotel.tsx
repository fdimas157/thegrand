import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export interface Login{
    email?: string,
    password?: string
}

export default function LoginHotel(){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, setLogin] = useState<Login>();
    const [wrongEmail, setWrongEmail] = useState<boolean>(false)
    const [wrongPassword, setWrongPassword] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const navigate = useNavigate()

    return (
    <>                
        <img src="/src/assets/other/Picture1.jpg" alt="" className="absolute object-cover object-top w-full h-full max-w-full max-h-full -z-10"/>
        <div className="h-screen w-full flex justify-end items-center flex-row gap-4 px-12">
            <div className=" w-full p-4 text-white text-4xl h-5/6 flex justify-end flex-col gap-2 pb-16">
                <div className="font-outfit font-bold">
                    Nikmati keindahan dalam kesederhanaan, sebuah pengalaman menginap yang menginspirasi
                </div>
                <div className="font-outfit text-sm text-black font-bold">Dapatkan promo menarik dan berbagai keseruan lainnya</div>
            </div>
            <div className="bg-white h-5/6 w-3/6 rounded-xl shadow-xl flex flex-col items-center p-4">
                <img src="/src/assets/other/log.png" alt="" className="w-3/5"/>
                <div className="font-outfit text-center text-lg px-8 -mt-8" >
                    Selamat datang di aplikasi booking hotel No. 1 di Indonesia
                </div>
                <form action="" className="p-4 flex flex-col w-full items-center font-outfit gap-4">
                    <div className="w-full flex items-center flex-col">
                        {
                            wrongEmail ? 
                            <div className="font-outfit text-xs text-left w-3/4 text-red-600">Email tidak ditemukan</div> : <div className="font-outfit text-xs text-white">Email tidak ditemukan</div> 
                        }
                        <input
                            type="email"
                            onChange={(e) => setLogin({...login, email: e.target.value})}
                            className="border-2 border-black h-10 w-3/4 rounded-lg px-2"
                            placeholder="Masukan email"
                        />
                    </div>
                    <div className="relative w-3/4">
                        {
                            wrongPassword ?
                            <div className="font-outfit text-xs w-3/4 text-left text-red-600">Password salah</div> : <div className="font-outfit text-xs text-white">Password salah</div>
                        }
                        <input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setLogin({...login, password: e.target.value})}
                            className="border-2 border-black h-10 w-full rounded-lg px-2"
                            placeholder="Masukan password"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-6 text-sm text-blue-600 hover:underline"
                        >
                        {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            fetch(`http://localhost:8084/api/customer/byemail/${login?.email}`)
                              .then((res) => {
                                if (!res.ok) {
                                  throw new Error("Email tidak terdaftar");
                                }
                                return res.json();
                              })
                              .then((data) => {
                                if (data.password === login?.password) {
                                  localStorage.setItem("user", data.email || "");
                                  navigate("/");
                                } else {
                                    setWrongEmail(false);
                                    setWrongPassword(true);
                                }
                              })
                              .catch(() => {
                                setWrongEmail(true);
                              });
                          }}                          
                        className="bg-blue-600 text-white w-2/5 h-10 rounded-lg font-bold cursor-pointer hover:bg-blue-700"
                    >
                        Masuk
                    </button>
                    <div className="flex flex-row text-sm gap-2">
                        <div>Belum punya akun?</div>
                        <Link to="/register" className="font-bold text-orange-500 cursor-pointer hover:underline">
                            Daftar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}