import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Hotel {
    id?: number,
    name: string,
    type: string,
    city: string,
    address: string,
    price: number,
    picture: string,
    description: string,
    roomAvailable: number,
    email: string,
    password: string
}

export default function RegisterAdminHotel(){
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [hotel, setHotel] = useState<Hotel>({
        name: "",
        type: "",
        city: "",
        address: "",
        price: 0,
        picture: "",
        description: "",
        roomAvailable: 0,
        email: "",
        password: ""
    })

    return <>
        <div className="bg-black/50 w-full h-screen absolute flex flex-row p-8">
            <div className="w-5/12 bg-gray-500/50 rounded-xl flex-col shadow-2xl">
                <div className="font-rowdies text-white text-2xl p-4 px-6 text-center">Daftar Hotel Mudah dan Cepat</div>
                <form action="" className="flex flex-col px-6 gap-2 text-white">
                    <label htmlFor="" className="flex flex-col gap-1">
                        <div className="text-sm font-bold">Nama Hotel</div>
                        <input 
                            required
                            onChange={(e) => setHotel({...hotel, name: e.target.value})} 
                            type="text" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                    </label>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="" className="flex flex-col gap-1 font-outfit font-bold text-sm w-1/2">
                            Kota
                            <select
                                required
                                onChange={(e) => setHotel({...hotel, city: e.target.value})}
                                className="border-2 border-black h-7 rounded px-2 text-xs bg-gray-100/10 focus:text-black focus:outline-none">
                                <option value="">Pilih Kota</option>
                                <option value="Sibolga">Sibolga</option>
                                <option value="Sidempuan">Sidempuan</option>
                                <option value="Barus">Barus</option>
                                <option value="Pinang Sori">Pinang Sori</option>
                                <option value="Pandan">Pandan</option>
                            </select>
                        </label>
                        <label htmlFor="" className="flex flex-col font-rowdies text-sm gap-1 w-1/2">
                            Tipe Penginapan
                            <select
                                required
                                onChange={(e) => setHotel({...hotel, type: e.target.value})}
                                className="border-2 border-black h-7 rounded px-2 font-outfit font-bold text-xs bg-gray-100/10 focus:text-black focus:outline-none">
                                <option value="">Pilih Tipe Penginapan</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Villa">Villa</option>
                                <option value="Apartemen">Apartemen</option>
                                <option value="Rumah">Rumah</option>
                                <option value="Glamping">Glamping</option>
                            </select>
                        </label>
                    </div>
                    <label htmlFor="" className="flex flex-col gap-1">
                        <div className="text-sm font-bold">Alamat Hotel</div>
                        <input required onChange={(e) => setHotel({...hotel, address: e.target.value})} type="text" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-1">
                        <div className="text-sm font-bold">Gambar Hotel</div>
                        <input required onChange={(e) => setHotel({...hotel, picture: e.target.value})} type="text" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                    </label>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="" className="flex flex-col gap-1 w-1/2">
                            <div className="text-sm font-bold">Harga Permalam</div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="text-sm font-bold">Rp. </div>
                                <input required onChange={(e) => setHotel({...hotel, price: parseInt(e.target.value)})} type="number" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                            </div>    
                        </label>
                        <label htmlFor="" className="flex flex-col gap-1 w-1/2">
                            <div className="text-sm font-bold">Kamar Tersedia</div>
                            <div className="flex flex-row gap-2 items-center">
                                <input required onChange={(e) => setHotel({...hotel, roomAvailable: parseInt(e.target.value)})} type="number" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                                <div className="text-sm font-bold">Kamar</div>
                            </div>    
                        </label>
                    </div>
                    <div className="flex flex-row gap-4">
                        <label htmlFor="" className="flex flex-col gap-1 w-1/2">
                            <div className="text-sm font-bold">Email</div>
                            <input required onChange={(e) => setHotel({...hotel, email: e.target.value})} type="email" className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"/>
                        </label>
                        <label htmlFor="" className="flex flex-col gap-1 w-1/2 relative">
                            <div className="text-sm font-bold">Password</div>
                            <input
                                required
                                onChange={(e) => setHotel({ ...hotel, password: e.target.value })}
                                type={showPassword ? "text" : "password"}
                                className="h-7 border-2 border-black rounded w-full px-2 bg-gray-100/10 font-outfit text-xs focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-8  text-xs"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}
                            </button>
                        </label>
                    </div>
                    <label className="flex flex-col font-rowdies text-sm gap-1">
                        <div>Deskripsi</div>
                        <textarea required onChange={(e) => setHotel({...hotel, description: e.target.value})} name="" id="" className="border-2 border-black rounded font-bold p-2 text-justify bg-gray-100/10 font-outfit text-xs focus:outline-none"></textarea>
                    </label>
                    <div className="text-xs font-rowdies text-white flex flex-row gap-4 w-full py-1 justify-center">
                            <button onClick={() => {
                                navigate("/login-hotel")
                            }} className="bg-red-800 w-1/4 h-7 rounded cursor-pointer">Login</button>
                            <button onClick={(e) => {
                                e.preventDefault(); 
                                console.log(hotel);
                                fetch("http://localhost:8084/api/hotel", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(hotel),
                                })
                                .then((response) => response.json())
                                .then(() => {
                                    localStorage.setItem("adminHotel", hotel.email || "");
                                    navigate("/admin-hotel");
                                })
                                }} className="bg-blue-800 w-1/4 h-7 rounded cursor-pointer">Daftar</button>
                        </div>
                </form>
            </div>
            <div className="flex justify-center items-center text-white w-7/12 p-4 px-8 flex-col gap-2">
                <div className="text-left font-rowdies text-4xl">Hanya dalam beberapa langkah, hotel Anda siap menyambut lebih banyak tamu.</div>
                <div className="font-outfit text-xs">Selamat datang di ng<span className="font-bold">IN</span>ep! Bergabunglah dengan ribuan hotel lainnya yang telah berhasil meningkatkan pendapatan dan visibilitas mereka. Dengan platform kami, Anda dapat dengan mudah mengelola pemesanan, tarif, dan inventaris hotel Anda. Nikmati akses ke jutaan calon tamu potensial dan tingkatkan pengalaman menginap tamu Anda. Daftar sekarang dan rasakan perbedaannya!"</div>
            </div>
        </div>
        <img src="/src/assets/other/registerhotel.jpg" className="w-full h-screen"/>
    </>
}