import { CircleX } from "lucide-react"
import { useEffect, useState } from "react"

export interface Hotel{
    id: number,
    name: string,
    type: string,
    city: string,
    address: string,
    price: number,
    picture: string,
    description: string,
    roomAvailable: number
}

export interface Visitor{
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    email: string,
    password: string,
    phone: string
}

export interface Booking{
    id: number,
    customerId: {
        id:number
      },
      hotelId: {
        id:number
      },
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    nights: number,
    totalPrice: number
}

export default function EditBooking({booking, setBooking, setPopUpEditBooking} : {
    booking: Booking
    setBooking: React.Dispatch<React.SetStateAction<boolean>>
    setPopUpEditBooking: React.Dispatch<React.SetStateAction<boolean>>
    editBooking: Booking
}) {

    const [editBooking, setEditBooking] =useState<Booking>(booking);
    const [dataVisitor, setDataVisitor] = useState<Visitor[]>([]);
    const [dataHotel, setDataHotel] = useState<Hotel[]>([]);
    const [selectedUser, setSelectedUser] = useState<Visitor>();
    const [selectedHotel, setSelectedHotel] = useState<Hotel>();

    useEffect(() => {
        fetch("http://localhost:8084/api/customer")
            .then((response) => response.json())
            .then((data) => setDataVisitor(data));
    }, [])

    useEffect(() => {
        fetch("http://localhost:8084/api/hotel")
            .then((response) => response.json())
            .then((data) => setDataHotel(data));
    }, [])

    useEffect(() => {
        fetch("http://localhost:8084/api/hotel/byid/" + editBooking.hotelId.id)
            .then((response) => response.json())
            .then((data) => setSelectedHotel(data));
    }, [editBooking.hotelId.id])
    
    useEffect(() => {
        fetch("http://localhost:8084/api/customer/" + editBooking.customerId.id)
            .then((response) => response.json())
            .then((data) => setSelectedUser(data));
    }, [editBooking.customerId.id])
    console.log(editBooking);
    

    return <>
    <div className="bg-black/70 w-4/5 h-screen flex justify-center items-center absolute right-0 ">
        <div className="h-3/4 w-3/4 bg-white rounded-xl p-4">
            <button onClick={() => {
                setPopUpEditBooking(false);
                setBooking(true);
            }}>
                <CircleX size={36} className="absolute right-28 top-16 text-red-600 bg-white rounded-full p-1"/>
            </button>
            <div className="font-rowdies text-3xl pb-8 px-2">Edit Data Booking</div>
            <form 
                action="" 
                className="flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-4 w-1/2 px-2">
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Nama Tamu
                        <select
                            onChange={(e) => {
                                e.preventDefault();
                                setEditBooking({...editBooking, customerId: {
                                    ...editBooking.customerId,
                                    id: parseInt(e.target.value)
                                }
                                })
                                console.log(editBooking.customerId.id);
                                
                            }}
                            className="border-2 border-black h-8 rounded px-2 font-rowdies">
                            <option value={selectedUser?.id}>{selectedUser?.firstName} {selectedUser?.lastName}</option>
                            {dataVisitor.map((data) => (
                                <option value={data.id}>{data.firstName} {data.lastName}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Check In
                        <input
                            value={editBooking.checkIn}
                            onChange={(e) => setEditBooking({...editBooking, checkIn: e.target.value})}
                            type="text" 
                            className="border-2 border-black h-8 rounded px-2 font-rowdies"/>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Jumlah Tamu Menginap
                        <div className="flex flex-row items-center gap-2 w-full">
                            <input
                                value={editBooking.numberOfGuest}
                                onChange={(e) => setEditBooking({...editBooking, numberOfGuest: parseInt(e.target.value)})}
                                type="number" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies w-full"
                            /> 
                            Orang
                        </div>
                    </label>
                    <div className="flex flex-col gap-2 font-rowdies text-sm">
                        Total Bayar
                        <div className="text-3xl w-full flex justify-between items-center">
                            <p>Rp. </p>
                            <p>{editBooking.totalPrice.toLocaleString('id-ID')}</p>
                        </div>
                        <p className="text-xs font-outfit text-right">Sudah termasuk pajak dan biaya lain-lain</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-1/2 px-2">
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Nama Hotel
                        <select
                            onChange={(e) => {
                                e.preventDefault();
                                setEditBooking({...editBooking, hotelId: {
                                    ...editBooking.hotelId,
                                    id: parseInt(e.target.value)
                                }
                                })
                                console.log(editBooking.hotelId.id);
                            }}
                            className="border-2 border-black h-8 rounded px-2 font-rowdies">
                            <option value="">{selectedHotel?.name}</option>
                            {dataHotel.map((data) => (
                                <option value={data.id}>{data.name}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Check Out
                        <input
                            value={editBooking.checkOut}
                            onChange={(e) => setEditBooking({...editBooking, checkOut: e.target.value})}
                            type="text" 
                            className="border-2 border-black h-8 rounded px-2 font-rowdies"/>
                    </label>
                    <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                        Lama Menginap
                        <div className="flex flex-row items-center gap-2 w-full">
                            <input
                                disabled
                                value={editBooking.nights}
                                onChange={(e) => setEditBooking({...editBooking, checkIn: e.target.value})}
                                type="number" 
                                className="border-2 border-black h-8 rounded px-2 font-rowdies w-full"
                            /> 
                            Malam
                        </div>
                    </label>
                    <div className="flex flex-row w-full gap-4 h-24 p-4 justify-center items-center text-white font-rowdies">
                        <button
                            onClick={() => {
                                setPopUpEditBooking(false);
                                setBooking(true);
                            }} 
                            className="bg-red-600 h-10 w-24 rounded-lg">Batal</button>
                        <button
                            onClick={() => {
                                fetch(`http://localhost:8084/api/booking/${editBooking.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(editBooking)
                                })
                                .then(() => setPopUpEditBooking(false))
                                .catch((err) => console.log(err))
                            }}
                            className="bg-blue-600 h-10 w-48 rounded-lg">Simpan Perubahan</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </>
}