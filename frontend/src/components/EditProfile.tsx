import { CircleX } from "lucide-react";
import { useState } from "react";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    email: string;
    password: string;
    phone: string;
}

export default function EditProfile({user, setPopUpEditProfile} : {
    user: User
    setPopUpEditProfile: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const [newUser, setNewUser] = useState<User>(user);

    return (
        <div className="bg-black/70 w-full h-screen flex justify-center items-center absolute right-0 top-0">
            <div className="h-4/5 w-1/2 bg-white rounded-xl p-4">
                <button>
                    <CircleX 
                        size={50} 
                        className="absolute right-72 top-10 text-red-600 bg-white rounded-full p-1"
                        onClick={() => setPopUpEditProfile(false)}
                    />
                </button>
                <div className="font-rowdies text-3xl pb-4">Tambah Data Hotel</div>
                <form 
                    action="" 
                    className="flex flex-col gap-2 w-full text-xs"
                >
                    <div className="flex flex-row gap-2 px-2 ">
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-1/2">
                            Nama Depan
                            <input
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                                type="text" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-1/2">
                            Nama Belakang
                            <input
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                                type="text" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                    </div>
                    <div className="flex flex-row gap-2 px-2">      
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-1/2">
                            Usia
                            <input 
                                value={newUser.age}
                                onChange={(e) => setNewUser({...newUser, age: Number(e.target.value)})}
                                type="number" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-1/2">
                            No. Handphone
                            <input
                                value={newUser.phone}
                                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                type="text" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                    </div>
                    <div className="px-2">
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-full">
                                Alamat
                                <input
                                    value={newUser.address}
                                    onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                                    type="text" 
                                    className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                    </div>
                    <div className="px-2">
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-full">
                                Email
                                <input
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    type="text" 
                                    className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                    </div>
                    <div className="px-2">
                        <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm w-full">
                                Password
                                <input
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                    type="text" 
                                    className="border-2 border-black h-8 rounded px-2 font-rowdies text-xs"/>
                        </label>
                    </div>
                    <div className="flex flex-row gap-4 w-full justify-center items-center p-4 text-sm">
                        <button
                            className="font-rowdies text-white bg-red-600 w-36 h-10 rounded-lg hover:bg-red-700">Batal</button>
                        <button
                            className="font-rowdies text-white bg-green-600 w-36 h-10 rounded-lg hover:bg-green-700"
                            onClick={() => {
                                fetch(`http://localhost:8084/api/customer/${newUser.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newUser)
                                })
                                .then(() => setPopUpEditProfile(false))
                                .catch((err) => console.log(err))
                            }}
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}