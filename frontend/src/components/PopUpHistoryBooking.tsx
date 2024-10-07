import { CircleX } from "lucide-react";
  
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
    firstName?: string,
    lastName?: string,
    age: number,
    address: string,
    email: string,
    password: string,
    phone: string
}

export interface Booking{
    id?: string,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    totalPrice: number,
    nights: number,
    customerId: Visitor,
    hotelId: Hotel,
}
export default function PopUpHistoryBooking({bookingDetail, setPopUpDetail, setHistoryBooking, historyBooking} : {
    bookingDetail: Booking,
    historyBooking: Booking[],
    setPopUpDetail: (value: boolean) => void,
    setHistoryBooking: (value: Booking[]) => void,
}) {
    return <div>
        <div className="w-full h-screen bg-black/50 absolute flex justify-center items-center">
            <div className="w-7/12 h-2/3 rounded-xl flex justify-center items-end shadow-xl">
                <img src={bookingDetail.hotelId.picture} className="w-full h-full rounded-xl" />
                <div className="w-7/12 h-2/3 absolute bg-white/60 rounded-xl p-4">
                    <div className="flex flex-col px-4 justify-center items-center pt-8">
                        <div className="font-rowdies px-4 text-xl">{bookingDetail.hotelId.name}</div>
                        <div className="font-outfit text-sm px-4 font-bold">Rp. {bookingDetail.totalPrice.toLocaleString('id-ID')}</div>
                        <div className="font-outfit text-xs px-4">Untuk {bookingDetail.numberOfGuest} x {bookingDetail.nights} malam</div>
                        <img src="/src/assets/other/barcode.png" alt="" className="w-72 h-40 p-4"/>
                        <div className="font-rowdies text-xl underline">- {bookingDetail.id} -</div>
                        <div className="font-outfit text-xs">Tunjukkan kode berikut kepada resepsionis hotel</div>
                    </div>
                    <div className="flex flex-row gap-4 w-full font-rowdies text-white justify-center pt-6">
                        <button
                            onClick={() => {
                                if(confirm("Apakah anda yakin ingin membatalkan reservasi ini?")){
                                    fetch(`http://localhost:8084/api/booking/${bookingDetail.id}`, {
                                        method: 'DELETE'
                                    }).then((response) => {
                                        if(response.ok){
                                            setHistoryBooking(historyBooking.filter((b) => b.id !== bookingDetail.id));
                                            setPopUpDetail(false);
                                        }
                                    })
                                }
                            }} 
                            className="w-40 p-2 bg-red-600 text-sm rounded">Cancel Booking</button>
                    </div>
                </div>
            </div>
            <div
                onClick={() => setPopUpDetail(false)} 
                className="bg-white rounded-full absolute top-24 right-64 w-10 h-10 flex justify-center items-center">
                <CircleX className=" text-red-600 cursor-pointer" size={32}/>
            </div>
        </div>
    </div>;
}