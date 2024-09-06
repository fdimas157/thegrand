import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface Visitor{
    id: number,
    name?: string,
    age: number,
    address: string,
    email: string,
    password: string,
    phone: string
}

export interface User{
    id: number,
    email: string,
    password: string,
    name: string,
    role: string
}

export default function RegisterHotel(){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({
        name: "",
        age: 0,
        address: "",
        email: "",
        password: "",
        phone: ""
    })

    const [user, setUser] = useState<Partial<User>>({
        email: "",
        password: "",
        name: "",
        role: "user"
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <>
        <img src="/src/assets/other/Picture2.jpg" alt="" className="absolute object-cover object-top w-full h-full max-w-full max-h-full -z-10"/>
        <div className="h-screen w-full flex justify-end items-center flex-row gap-4 px-12">
            <div className="bg-white h-5/6 w-5/6 rounded-xl shadow-xl flex flex-col items-center p-4">
                <div className="font-rowdies text-center text-2xl p-4" >
                    Daftar Akun
                </div>
                <form action="" className="flex w-full items-center font-outfit flex-row">
                    <div className=" flex flex-col w-full gap-2">
                        <label htmlFor="" className="flex flex-col w-full items-center px-2">
                            <div className="text-left w-full font-bold">Nama Lengkap</div>
                            <input 
                                type="email"
                                required
                                onChange={(e)=> {
                                    setNewVisitor({...newVisitor, name: e.target.value});
                                    setUser({...user, name: e.target.value})
                                }}
                                className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                        </label>
                        <div className="flex flex-row">
                            <label htmlFor="" className="flex flex-col w-full items-center px-2">
                                <div className="text-left w-full font-bold">Usia</div>
                                <input 
                                    type="number" 
                                    required
                                    onChange={(e)=> {setNewVisitor({...newVisitor, age: parseInt(e.target.value)})}}
                                    className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                            </label>
                            <label htmlFor="" className="flex flex-col w-full items-center px-2">
                                <div className="text-left w-full font-bold">No. Hp</div>
                                <input 
                                    type="number" 
                                    required
                                    onChange={(e)=> setNewVisitor({...newVisitor, phone: e.target.value})}
                                    className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                            </label>
                        </div>
                        <label htmlFor="" className="flex flex-col w-full items-center px-2">
                            <div className="text-left w-full font-bold">Alamat</div>
                            <input 
                                type="text" 
                                required
                                onChange={(e)=> setNewVisitor({...newVisitor, address: e.target.value})}
                                className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-full items-center px-2">
                            <div className="text-left w-full font-bold">Email</div>
                            <input 
                                type="email" 
                                required
                                onChange={(e)=> {
                                    setNewVisitor({...newVisitor, email: e.target.value})
                                    setUser({...user, email: e.target.value})
                                }}
                                className="border-2 border-black h-10 w-full rounded-lg px-2 text-sm" />
                        </label>

                        <label htmlFor="" className="flex flex-col w-full items-center px-2">
                            <div className="text-left w-full font-bold">Password</div>
                            <div className="relative w-full">
                                <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                onChange={(e)=> {
                                    setNewVisitor({...newVisitor, password: e.target.value})
                                    setUser({...user, password: e.target.value})
                                }}
                                className="border-2 border-black h-10 w-full rounded-lg px-2 text-sm"
                                />
                                <button 
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-2 top-2 text-sm text-blue-600 hover:underline"
                                >
                                {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </label>
                        <div className="p-2 flex justify-center items-center gap-4">
                            <Link to={"/login"} className="bg-blue-600 text-white w-2/5 h-10 rounded-lg font-bold cursor-pointer hover:bg-blue-700 flex justify-center items-center">Login</Link>
                            <button 
                                onClick={() => {
                                    fetch("http://localhost:8084/api/customer", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(newVisitor),
                                    })
                                    .then((response) => response.json())
                                    .then(() => {
                                        navigate("/")
                                        setNewVisitor({
                                            name: "",
                                            age: 0,
                                            address: "",
                                            email: "",
                                            password: "",
                                            phone: ""
                                        }
                                    )});
                                    fetch("http://localhost:8084/api/user", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(user),
                                    })
                                    .then((response) => response.json())
                                    .then(() => {
                                        localStorage.setItem('user', newVisitor.email || "");
                                        navigate("/")
                                        setNewVisitor({
                                            name: "",
                                            age: 0,
                                            address: "",
                                            email: "",
                                            password: "",
                                            phone: ""
                                        }
                                    )});
                                }}
                                className="bg-orange-500 text-white w-2/5 h-10 rounded-lg font-bold cursor-pointer hover:bg-orange-600"
                            >
                                Daftar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className=" w-full p-4 text-white text-4xl h-5/6 flex justify-center flex-col gap-2 pb-16">
                <div className="font-outfit font-bold">
                    Nikmati keindahan dalam kesederhanaan, sebuah pengalaman menginap yang menginspirasi
                </div>
                <div className="font-outfit text-sm text-white font-bold">Dapatkan promo menarik dan berbagai keseruan lainnya</div>
            </div>
        </div>
    </>
}