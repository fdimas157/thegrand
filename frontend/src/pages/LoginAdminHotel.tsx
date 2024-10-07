import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Login{
    email?: string,
    password?: string
}

export default function LoginAdminHotel() {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState<Login>({});
    const [wrongEmail, setWrongEmail] = useState<boolean>(false)
    const [wrongPassword, setWrongPassword] = useState<boolean>(false)
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()

    return <div>
        <img src="/src/assets/other/loginhotel.jpg" alt="" className="w-full h-screen"/>
        <div className="bg-black/50 w-full h-screen absolute top-0 flex justify-center items-center">
            <div className="w-2/6 h-4/5 bg-white rounded-3xl flex flex-col items-center p-4">
                <img src="/src/assets/other/logocrop.png" className="w-56 mt-8"/>
                <div className="font-outfit text-sm text-center">Selamat Datang di ng<span className="font-bold text-yellow-500">IN</span>ep. <br />Dashboard Impianmu untuk Mengelola Hotel.</div>
                <form action="" className="flex flex-col w-full p-6 font-outfit gap-2">
                    <label htmlFor="" className="flex flex-col gap-1">
                        <div className="flex flex-row justify-between items-center">
                            <div className="font-bold">Email</div>
                            {
                                wrongEmail ? <div className="text-red-600 text-xs">Email tidak terdaftar</div> : <div className="text-white text-xs">Email tidak terdaftar</div> 
                            }
                        </div>
                        <input onChange={(e) => setLogin({...login, email: e.target.value})} type="text" className="w-full border-2 border-black h-10 rounded px-2 text-sm"/>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-1">
                        <div className="flex flex-row justify-between items-center">
                        <div className="font-bold">Password</div>
                        {
                            wrongPassword ? <div className="text-red-600 text-xs">Password salah</div> : <div className="text-white text-xs">Password salah</div>
                        }
                        </div>
                        <div className="relative w-full">
                        <input
                            onChange={(e) => setLogin({...login, password: e.target.value})}
                            type={showPassword ? "text" : "password"}
                            className="w-full border-2 border-black h-10 rounded px-2 text-sm"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-sm text-blue-600"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                        </div>
                    </label>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            fetch(`http://localhost:8084/api/hotel/byemail/${login?.email}`)
                            .then((res) => {
                                if(!res.ok){
                                    throw new Error("Email tidak terdaftar");
                                }
                                return res.json();
                            })
                            .then((data) => {
                                if (data.password === login?.password) {
                                    localStorage.setItem("adminHotel", data.email || "");
                                    navigate("/admin-hotel");
                                } else {
                                      setWrongEmail(false);
                                      setWrongPassword(true);
                                }
                            })
                            .catch(() => {
                              setWrongEmail(true);
                            });
                        }}
                        className="bg-blue-600 text-white h-10 rounded mt-2 font-rowdies hover:bg-blue-700">Masuk</button>
                    <div className="flex flex-row gap-1 justify-center font-outfit text-xs">
                        <div className="">Daftarkan hotelmu segera!</div>
                        <div
                            onClick={() => navigate("/register-hotel")} 
                            className="font-bold text-green-600 hover:underline cursor-pointer"> Daftar </div>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}