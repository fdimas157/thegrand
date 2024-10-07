import { BedDouble, CircleDollarSign, House, LogOut, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditHotel from "../components/EditHotel";

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
    createdAt: string,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    totalPrice: number,
    nights: number,
    customerId: Visitor
    hotelId: Hotel
  }

export default function AdminHotel() {
    const [showDashboard, setShowDashboard] = useState<boolean>(true);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [showReservation, setShowReservation] = useState<boolean>(false);
    const [hotel, setHotel] = useState<Hotel>()
    const [booking, setBooking] = useState<Booking[]>([])
    const [popUpEdit, setPopUpEdit] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(1);
    const income = booking.reduce((acc, book) => acc + (book.totalPrice || 0), 0);
    const totalBooking = booking.length;
    const totalGuest = booking.reduce((acc, book) => acc + (book.numberOfGuest || 0), 0);
    const navigate = useNavigate();
    const itemsPerPage = 5;
    const totalItems = booking.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = booking.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    useEffect(() => {
        fetch(`http://localhost:8084/api/hotel/byemail/${localStorage.getItem('adminHotel')}`)
            .then((response) => response.json())
            .then((data) => {
                setHotel(data);
                localStorage.setItem('hotelId', data.id.toString());
            });
    }, [])

    useEffect(() => {
        const hotelId = localStorage.getItem('hotelId');
        const parsedHotelId = hotelId ? parseInt(hotelId) : null;
    
        if (parsedHotelId) {
            fetch(`http://localhost:8084/api/booking/byhotel/${parsedHotelId}`)
                .then((response) => response.json())
                .then((data) => setBooking(data))
                .catch((error) => console.error('Error fetching bookings:', error));
        } else {
            console.error('Hotel ID is not valid');
        }
    }, [hotel?.id]);

    

    return <div className="flex flex-row">
        <div className="w-1/5 bg-white h-screen absolute flex flex-col p-4 text-black gap-4">
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-rowdies text-blue-600 text-4xl">
                    ng<span className="text-yellow-400">IN</span>ep
                </h1>
                <div className="font-bold text-xs font-outfit">Kelola Hotel Anda Dengan Mudah</div>
            </div>
            <div className="flex flex-col gap-4">
                <div 
                    onClick={() => {
                        setShowDashboard(true); 
                        setShowProfile(false);
                        setShowReservation(false);
                    }} 
                    className="mt-8 bg-blue-600 text-white w-full font-rowdies text-sm h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white rounded-lg hover:bg-blue-800">
                    <House />
                    Dashboard
                </div>
                <div
                    onClick={() => {
                        setShowDashboard(false);
                        setShowProfile(true);
                        setShowReservation(false);
                    }} 
                    className="bg-blue-600 text-white w-full font-rowdies text-sm h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white rounded-lg hover:bg-blue-800">
                    <BedDouble />
                    Profil Hotel
                </div>
                <div
                    onClick={() => {
                        setShowDashboard(false);
                        setShowProfile(false);
                        setShowReservation(true);
                    }} 
                    className="bg-blue-600 text-white w-full font-rowdies text-sm h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white rounded-lg hover:bg-blue-800">
                    <CircleDollarSign />
                    Pemesanan
                </div>
                <div
                    onClick={() => {
                        localStorage.removeItem('adminHotel');
                        localStorage.removeItem('hotelId');
                        navigate("/login-hotel");
                    }} 
                    className="bg-red-600 text-white w-full font-rowdies text-sm h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white rounded-lg hover:bg-red-800">
                    <LogOut />
                    Keluar
                </div>
            </div>
        </div>
        <div className="w-4/5 bg-white/70 h-screen absolute right-0">
            <div className="flex flex-col p-4">
                {popUpEdit && hotel && (
                    <EditHotel 
                        setPopUpEdit={setPopUpEdit} 
                        setShowProfile={setShowProfile} 
                        setShowDashboard={setShowDashboard} 
                        hotel={hotel} 
                    />
                )}
                {showDashboard && (
                    <>
                        <div className="flex flex-col p-4 pt-6">
                            <div className="font-rowdies text-3xl">Dashboard</div>
                            <div className="font-outfit font-bold text-sm">{hotel?.name}, {hotel?.city}</div>
                        </div>
                        <div className="flex flex-row gap-4 p-4">
                            <div className="bg-white w-1/3 h-48 rounded-lg shadow-xl">
                                <div className="flex flex-col font-rowdies text-blue-600 p-6">
                                    <div className="text-xl">Kamar Tersedia</div>
                                    <div className="text-xs text-black font-outfit">Akumulasi tipe reguler, suites, dan deluxe</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24 text-black">{hotel?.roomAvailable}</div>
                                </div>
                            </div>
                            <div className="bg-white w-1/3 h-48 rounded-lg shadow-xl">
                                <div className="flex flex-col font-rowdies text-blue-600 p-6">
                                    <div className="text-xl">Total Tamu</div>
                                    <div className="text-xs text-black font-outfit">Akumulasi selama bulan ini</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24 text-black">{totalGuest}</div>
                                </div>
                            </div>
                            <div className="bg-blue-600 w-1/3 h-48 rounded-lg shadow-xl">
                                <div className="flex flex-col font-rowdies text-white p-6">
                                    <div className="text-xl">Total Pemesanan</div>
                                    <div className="text-xs font-outfit">Akumulasi selama bulan ini</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24">{totalBooking}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 flex flex-row gap-4">
                            <div className="bg-white w-full h-56 rounded-lg shadow-xl">
                                <div className="flex flex-col font-rowdies text-black p-6">
                                    <div className="text-xl">Total Pemasukan</div>
                                    <div className="text-xs font-outfit">Sebelum dikurangi pajak dan biaya third party</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24">Rp. {income.toLocaleString('id-ID')}</div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {showProfile && (
                    <>
                        <div className="flex flex-col p-4 pt-6">
                            <div className="font-rowdies text-3xl">Profil Hotel</div>
                        </div>
                        <div className="flex flex-row gap-4 px-4">
                            <div className="bg-white w-1/2 h-80 rounded-xl shadow-xl p-4">
                                <table className="w-full h-20 text-sm font-outfit">
                                    <tr>
                                        <td>Nama Hotel</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">{hotel?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Alamat</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">{hotel?.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Kota</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">{hotel?.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Tipe</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">{hotel?.type}</td>
                                    </tr>
                                    <tr>
                                        <td>Kamar Tersedia</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">{hotel?.roomAvailable} Kamar</td>
                                    </tr>
                                    <tr>
                                        <td>Harga permalam</td>
                                    </tr>
                                    <tr>
                                        <td className="text-base font-bold px-8">Rp. {hotel?.price.toLocaleString('id-ID')}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="bg-white w-1/2 h-80 rounded-xl shadow-xl pt-3 px-4 flex flex-col gap-2">
                                <div className="font-rowdies text-lg">Foto</div>
                                <img src={hotel?.picture} className="rounded-xl h-64"/>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col gap-2 items-end">
                            <div className="font-rowdies text-xl bg-white h-32 w-full rounded-xl flex flex-col p-4 gap-2">
                                <div className="font-rowdies text-lg">Deskripsi</div>
                                <div className="font-outfit text-sm text-justify">{hotel?.description}</div>
                            </div>
                            <button
                                onClick={() => {
                                    setPopUpEdit(true);
                                }}
                                className="font-rowdies bg-blue-600 w-1/6 text-white h-8 text-sm rounded-lg cursor-pointer hover:bg-blue-700">Edit Data Hotel</button>
                        </div>
                    </>
                )}
                {showReservation && (
                    <>
                        <div className="flex flex-col p-4 pt-6">
                            <div className="font-rowdies text-3xl">Pemesanan</div>
                            <div className="font-outfit font-bold text-sm">{hotel?.name}, {hotel?.city}</div>
                        </div>
                        <div className="p-4">
                            <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col gap-4">
                                <form action="" className="flex flex-row">
                                    <input type="text" className="rounded-s h-8 text-sm font-outfit px-2 border-2 border-black w-56" placeholder="Cari berdasarkan tamu ...."/>
                                    <button className="flex justify-center items-center bg-yellow-400 w-10 border-2 border-black rounded-e border-l-0"><Search/></button>
                                </form>
                                <div className="w-full h-80">
                                    <table className="w-full border-2 border-gray-600 font-outfit text-xs text-center">
                                        <tr>
                                            <th className="border-2 border-black">Tanggal Pemesanan</th>
                                            <th className="border-2 border-black">Nama Tamu</th>
                                            <th className="border-2 border-black">Check In</th>
                                            <th className="border-2 border-black">Check Out</th>
                                            <th className="border-2 border-black">Jumlah Tamu</th>
                                            <th className="border-2 border-black">Lama Menginap</th>
                                            <th className="border-2 border-black">Total Harga</th>
                                            <th className="border-2 border-black p-2">Status</th>
                                        </tr>
                                        {currentBookings  && currentBookings .length > 0 ?
                                            currentBookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td className="border-2 border-black">{booking.createdAt}</td>
                                                    <td className="border-2 border-black">{booking.customerId.firstName} {booking.customerId.lastName}</td>
                                                    <td className="border-2 border-black">{booking.checkIn}</td>
                                                    <td className="border-2 border-black">{booking.checkOut}</td>
                                                    <td className="border-2 border-black">{booking.numberOfGuest}</td>
                                                    <td className="border-2 border-black">{booking.nights}</td>
                                                    <td className="border-2 border-black">Rp. {booking.totalPrice.toLocaleString('id-ID')}</td>
                                                    <td className="border-2 border-black p-2 text-blue-600 font-bold">Paid</td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td colSpan={8} className="border-2 border-black py-4 font-bold text-lg text-red-600">Belum ada pemesanan di hotel ini</td>
                                            </tr>
                                        }
                                    </table>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 font-outfit text-xs font-bold">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 mx-1 bg-white text-black rounded hover:bg-gray-100 w-24 cursor-pointer shadow-xl"
                                >
                                Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white w-10 shadow-xl' : 'bg-gray-300 shadow-xl text-black w-8'} rounded hover:bg-blue-700`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 mx-1 bg-white text-black rounded hover:bg-gray-100 cursor-pointer w-24 shadow-xl"
                                >
                                Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
        <img src={hotel?.picture} className="w-full h-screen"/>
    </div>;
}