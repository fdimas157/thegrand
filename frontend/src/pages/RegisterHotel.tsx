import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export interface Visitor{
    id: number,
    firstName?: string,
    lastName?: string,
    age: number,
    address: string,
    email: string,
    password: string,
    phone: string
}

export default function RegisterHotel(){
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const [newVisitor, setNewVisitor] = useState<Partial<Visitor>>({
        firstName: "",
        lastName: "",
        age: 0,
        address: "",
        email: "",
        password: "",
        phone: ""
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
                        <div className="flex flex-row">
                            <label htmlFor="" className="flex flex-col w-full items-center px-2">
                                <div className="text-left w-full font-bold">Nama Depan</div>
                                <input 
                                    type="text"
                                    required
                                    onChange={(e)=> {
                                        setNewVisitor({...newVisitor, firstName: e.target.value});
                                    }}
                                    className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                            </label>
                            <label htmlFor="" className="flex flex-col w-full items-center px-2">
                                <div className="text-left w-full font-bold">Nama Belakang</div>
                                <input 
                                    type="text"
                                    required
                                    onChange={(e)=> {
                                        setNewVisitor({...newVisitor, lastName: e.target.value});
                                    }}
                                    className="border-2 border-black h-10 w-full rounded-lg text-sm px-2" />
                            </label>
                        </div>
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
                                onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        const customerResponse = await fetch("http://localhost:8084/api/customer", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(newVisitor),
                                        });
                                        if (!customerResponse.ok) {
                                            throw new Error(`Error: ${customerResponse.status} ${customerResponse.statusText}`);
                                        }
                                        const customerResult = await customerResponse.json();
                                        console.log("Customer created successfully:", customerResult);
                                        setNewVisitor({
                                            firstName: "",
                                            lastName: "",
                                            age: 0,
                                            address: "",
                                            email: "",
                                            password: "",
                                            phone: "",
                                        });
                                        localStorage.setItem('user', newVisitor.email || "");
                                        navigate("/");
                                    } catch (error) {
                                        console.error("Error occurred:", error);
                                        alert("Failed to submit data. Please try again later.");
                                    }
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