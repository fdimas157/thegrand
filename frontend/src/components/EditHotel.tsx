import { CircleX, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

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

export default function EditHotel({hotel, setPopUpEdit, setShowProfile, setShowDashboard} : {
    hotel: Hotel,
    setPopUpEdit: (value: boolean) => void
    setShowProfile: (value: boolean) => void
    setShowDashboard: (value: boolean) => void
}){
    const [showPassword, setShowPassword] = useState(false);
    const [editHotel, setEditHotel] = useState<Hotel>(hotel);

    return <>
        <div className="bg-black/70 w-full h-screen flex justify-center items-center absolute right-0 top-0">
            <div className="h-3/4 w-3/4 bg-white rounded-xl px-4">
                <button onClick={() => {
                    setPopUpEdit(false);
                    setShowProfile(true);
                    setShowDashboard(false);
                }}>
                    <CircleX size={36} className="absolute right-28 top-16 text-red-600 bg-white rounded-full p-1"/>
                </button>   
                <div className="font-rowdies text-2xl pb-2">Edit Data Hotel</div>
                <form className="w-full h-96 flex flex-row gap-2">
                    <div className=" w-1/2 h-full flex flex-col gap-3 p-2">
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Nama Hotel</div>
                            <input onChange={(e) => setEditHotel({...editHotel, name: e.target.value})} value={editHotel.name} type="text" className="border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                        </label>
                        <label htmlFor="" className="flex flex-col font-rowdies text-sm gap-1">
                            Kota
                            <select
                                value={editHotel.type}
                                onChange={(e) => setEditHotel({...editHotel, city: e.target.value})}
                                className="border-2 border-black h-7 rounded px-2 font-outfit font-bold text-xs">
                                <option value="">Pilih Kota</option>
                                <option value="Jakarta">Jakarta</option>
                                <option value="Bandung">Bandung</option>
                                <option value="Yogyakarta">Yogyakarta</option>
                                <option value="Medan">Medan</option>
                                <option value="Surabaya">Surabaya</option>
                            </select>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Alamat Hotel</div>
                            <input onChange={(e) => setEditHotel({...editHotel, address: e.target.value})} value={editHotel.address} type="text" className="border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Kamar Tersedia</div>
                            <div className="flex flex-row gap-2 items-center">
                                <input onChange={(e) => setEditHotel({...editHotel, roomAvailable: parseInt(e.target.value)})} value={editHotel.roomAvailable} type="number" className="w-full border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                                <div className="px-2">Kamar</div>
                            </div>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Harga Permalam</div>
                            <div className="flex flex-row gap-2 items-center">
                                <div className="">Rp. </div>
                                <input value={hotel?.price} onChange={(e) => setEditHotel({...editHotel, price: parseInt(e.target.value)})} type="number" className=" w-full border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                            </div>
                        </label>
                        <label htmlFor="" className="flex flex-col font-rowdies text-sm gap-1">
                            Tipe Penginapan
                            <select
                                onChange={(e) => setEditHotel({...editHotel, type: e.target.value})}
                                className="border-2 border-black h-7 rounded px-2 font-outfit font-bold text-xs">
                                <option value="">Pilih Tipe Penginapan</option>
                                <option value="Hotel">Hotel</option>
                                <option value="Villa">Villa</option>
                                <option value="Apartemen">Apartemen</option>
                                <option value="Rumah">Rumah</option>
                                <option value="Glamping">Glamping</option>
                            </select>
                        </label>
                    </div>
                    <div className="w-1/2 h-full flex flex-col gap-3 p-2">
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Gambar</div>
                            <input onChange={(e) => setEditHotel({...editHotel, picture: e.target.value})} value={hotel?.picture} type="text" className="border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Email</div>
                            <input onChange={(e) => setEditHotel({...editHotel, email: e.target.value})} value={hotel?.email} type="text" className="border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"/>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1 relative">
                            <div>Password</div>
                            <input
                                value={hotel?.password}
                                onChange={(e) => setEditHotel({...editHotel, password: e.target.value})}
                                type={showPassword ? "text" : "password"}
                                className="border-2 font-bold border-black h-7 text-xs rounded font-outfit px-2"
                            />
                            <button 
                                type="button" 
                                className="absolute right-2 top-10 transform -translate-y-1/2 text-xs"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                            </button>
                        </label>
                        <label className="flex flex-col font-rowdies text-sm gap-1">
                            <div>Deskripsi</div>
                            <textarea onChange={(e) => setEditHotel({...editHotel, description: e.target.value})} name="" id="" className="border-2 border-black rounded font-outfit font-bold h-28 text-xs p-2 text-justify">
                                {hotel?.description}
                            </textarea>
                        </label>
                        <div className="text-xs font-rowdies text-white flex flex-row gap-4 w-full py-1">
                            <button onClick={() => {
                                setPopUpEdit(false);
                                setShowProfile(true);
                            }} className="bg-red-600 w-1/2 h-7 rounded cursor-pointer">Batal</button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetch(`http://localhost:8084/api/hotel/${editHotel.id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(editHotel)
                                    })
                                    .then(() => {
                                        setEditHotel(editHotel)
                                        setPopUpEdit(false);
                                        setShowDashboard(false);
                                        setShowProfile(true);
                                        window.location.reload()
                                    })
                                    .catch((err) => console.log(err))
                                }}
                                className="bg-blue-600 w-1/2 h-7 rounded cursor-pointer">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}