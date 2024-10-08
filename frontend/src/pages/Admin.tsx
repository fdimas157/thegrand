import { BedDouble, CircleDollarSign, House, UsersRound, Search, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import EditBooking from "../components/EditBooking";
import EditHotel from "../components/EditHotel";
import EditProfile from "../components/EditProfile";

export interface Hotel{
    id: number,
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
    customerId: Visitor,
    hotelId: Hotel,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    nights: number,
    totalPrice: number
}

export default function Admin(){
    const [dashboard, setDashboard] = useState<boolean>(true)
    const [hotel, setHotel] = useState<boolean>(false)
    const [visitor, setVisitor] = useState<boolean>(false)
    const [booking, setBooking] = useState<boolean>(false)
    const [popUpAdd, setPopUpAdd] = useState<boolean>(false)
    const [popUpEditBooking, setPopUpEditBooking] = useState<boolean>(false)
    const [dataPopUpBooking, setDataPopUpBooking] = useState<Booking>()
    const [dataHotel, setDataHotel] = useState<Hotel[]>([]);
    const [dataVisitor, setDataVisitor] = useState<Visitor[]>([]);
    const [dataBooking, setDataBooking] = useState<Booking[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [popUpEdit, setPopUpEdit] = useState<boolean>(false)
    const [editDataHotel, setEditDataHotel] = useState<Hotel>();
    const [popUpEditVisitor, setPopUpEditVisitor] = useState<boolean>(false);
    const [editDataVisitor, setEditDataVisitor] = useState<Visitor>();
    const itemsPerPage: number = 5;
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentItems: Hotel[] = dataHotel.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);
    const [newHotel, setNewHotel] = useState<Partial<Hotel>>({
        name: "",
        type: "",
        city: "",
        address: "",
        price: 0,
        picture: "",
        description: "",
        roomAvailable: 0,
    })

    useEffect(() => {
        fetch("http://localhost:8084/api/hotel")
            .then((response) => response.json())
            .then((data) => setDataHotel(data));
    }, [])

    useEffect(() => {
        fetch("http://localhost:8084/api/customer")
            .then((response) => response.json())
            .then((data) => setDataVisitor(data));
    }, [])

    useEffect(() => {
        fetch("http://localhost:8084/api/booking")
            .then((response) => response.json())
            .then((data) => setDataBooking(data));
    }, [])
    

    return <div className="flex flex-row">
        <div className="w-1/5 h-auto  flex flex-col items-center p-4 gap-4 bg-blue-600">
            <div className="flex flex-col items-center gap-2">
                <h1 className="font-rowdies text-white text-4xl">
                    ng<span className="text-yellow-400">IN</span>ep
                </h1>
                <div className="font-bold text-xs text-white">Situs Booking Hotel Terpercaya</div>
            </div>
            <div 
                onClick={() => {
                    setDashboard(true);
                    setBooking(false);
                    setHotel(false);
                    setVisitor(false);
                }} 
                className="mt-8 bg-white w-full text-blue-600 font-rowdies text-sm rounded h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white hover:border-yellow-400">
                <House />
                Dashboard
            </div>
            <div onClick={() => {
                    setHotel(true);
                    setDashboard(false);
                    setBooking(false);
                    setVisitor(false);
                }}   
                className=" bg-white w-full text-blue-600 font-rowdies text-sm rounded h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white hover:border-yellow-400">
                <BedDouble />
                Hotel
            </div>
            <div onClick={() => {
                    setVisitor(true);
                    setHotel(false);
                    setDashboard(false);
                    setBooking(false);
                }}    
                className=" bg-white w-full text-blue-600 font-rowdies text-sm rounded h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white hover:border-yellow-400">
                <UsersRound />
                Visitor
            </div>
            <div onClick={() => {
                    setBooking(true);
                    setVisitor(false);
                    setHotel(false);
                    setDashboard(false);
                }}   
                className=" bg-white w-full text-blue-600 font-rowdies text-sm rounded h-12 cursor-pointer flex items-center p-2 gap-2 border-4 border-white hover:border-yellow-400">
                <CircleDollarSign />
                Pemesanan Hotel
            </div>     
        </div>
        <div className="w-4/5 h-screen">
            {popUpAdd && (
                <div className="bg-black/70 w-4/5 h-screen flex justify-center items-center absolute right-0">
                    <div className="h-3/4 w-3/4 bg-white rounded-xl p-4">
                        <button onClick={() => {
                            setPopUpAdd(false);
                            setHotel(true);
                        }}>
                            <CircleX size={36} className="absolute right-28 top-16 text-red-600 bg-white rounded-full p-1"/>
                        </button>
                        <div className="font-rowdies text-3xl pb-4">Tambah Data Hotel</div>
                        <form 
                            action="" 
                            className="flex flex-row gap-2 w-full">
                            <div className="flex flex-col gap-2 w-1/2 px-2">
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Nama
                                    <input 
                                        onChange={(e) => {
                                            setNewHotel({...newHotel, name: e.target.value});
                                            console.log(newHotel.name);
                                            
                                        }}
                                        type="text" 
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies"/>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Kota
                                    <select
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setNewHotel({...newHotel, city: e.target.value})
                                        }}
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies">
                                        <option value="">Pilih Kota</option>
                                        <option value="Jakarta">Jakarta</option>
                                        <option value="Bandung">Bandung</option>
                                        <option value="Yogyakarta">Yogyakarta</option>
                                        <option value="Medan">Medan</option>
                                        <option value="Surabaya">Surabaya</option>
                                    </select>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Alamat
                                    <input
                                        onChange={(e) => setNewHotel({...newHotel, address: e.target.value})}
                                        type="text" 
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies"/>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Kamar Tersedia
                                    <input 
                                        type="number" 
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies"
                                        onChange={(e) => setNewHotel({...newHotel, roomAvailable: parseInt(e.target.value)})}
                                    />
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm ">
                                    Harga Sewa
                                    <div className="flex flex-row items-center gap-2">
                                        Rp. 
                                        <input 
                                            type="number" 
                                            onChange={(e) => setNewHotel({...newHotel, price: parseInt(e.target.value)})}
                                            className="border-2 border-black h-8 rounded px-2 font-rowdies w-full"/>
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-col gap-2 w-1/2 px-2">      
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Upload Foto
                                    <input 
                                        type="text" 
                                        onChange={(e) => setNewHotel({...newHotel, picture: e.target.value})}
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies"/>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Tipe Penginapan
                                    <select
                                        onChange={(e) => {
                                            e.preventDefault();
                                            setNewHotel({...newHotel, type: e.target.value})
                                        }}
                                        className="border-2 border-black h-8 rounded px-2 font-rowdies">
                                        <option value="">Pilih Tipe Penginapan</option>
                                        <option value="Hotel">Hotel</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Apartemen">Apartemen</option>
                                        <option value="Rumah">Rumah</option>
                                        <option value="Glamping">Glamping</option>
                                    </select>
                                </label>
                                <label htmlFor="" className="flex flex-col gap-2 font-rowdies text-sm">
                                    Tambahkan Deskripsi
                                    <textarea 
                                        name="" 
                                        id="" 
                                        onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                                        className="border-2 border-black rounded px-2 font-rowdies h-24" ></textarea>
                                </label>
                                <div className="flex flex-row gap-4 w-full justify-center items-center p-4 text-sm">
                                    <button
                                        onClick={() => {
                                            setPopUpAdd(false);
                                            setHotel(true);
                                        }}
                                        className="font-rowdies text-white bg-red-600 w-36 h-10 rounded-lg hover:bg-red-700">Buang</button>
                                    <button 
                                        onClick={(e) => {
                                            fetch("http://localhost:8084/api/hotel", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify(newHotel),
                                            })
                                            .then((response) => response.json())
                                            .then(() => {
                                                e.preventDefault();
                                                setPopUpAdd(false);
                                                setHotel(true);
                                                setDashboard(false);
                                                setNewHotel({
                                                    name: "",
                                                    type: "",
                                                    city: "",
                                                    address: "",
                                                    price: 0,
                                                    picture: "",
                                                    description: "",
                                                    roomAvailable: 0,
                                                }
                                            )})
                                        }}
                                        className="font-rowdies text-white bg-green-600 w-36 h-10 rounded-lg hover:bg-green-700"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {popUpEdit && (
                    <EditHotel
                        setPopUpEdit={setPopUpEdit}
                        hotel={editDataHotel} 
                    />
                )}
            {popUpEditBooking && (
                    <EditBooking booking={dataPopUpBooking} setBooking={setBooking} setPopUpEditBooking={setPopUpEditBooking}/>
                )}
            {popUpEditVisitor && (
                <EditProfile setPopUpEditProfile={setPopUpEditVisitor} user={editDataVisitor}/>
            )}
            {dashboard && (
                <div className="text-black  w-full h-screen flex flex-col p-6">
                    <div className="font-rowdies text-3xl pt-4">Dashboard</div>
                    <div className="flex flex-col mt-12 gap-4">
                        <div className=" flex flex-row gap-4">
                            <div className="bg-blue-600 h-48 w-1/3 rounded-lg">
                                <div className="flex flex-col font-rowdies text-white p-6">
                                    <div className="text-xl">Jumlah Hotel</div>
                                    <div className="text-xs font-outfit">Akumulasi hotel yang terdaftar</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-28">{dataHotel.length}</div>
                                </div>
                            </div>
                            <div className="bg-blue-600 h-48 w-1/3 rounded-lg">
                            <div className="flex flex-col font-rowdies text-white p-6">
                                    <div className="text-xl">Jumlah Pengunjung</div>
                                    <div className="text-xs font-outfit">Akumulasi tamu yang terdaftar</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24">{dataVisitor.length}</div>
                                </div>
                            </div>
                            <div className="bg-blue-600 h-48 w-1/3 rounded-lg">
                            <div className="flex flex-col font-rowdies text-white p-6">
                                    <div className="text-xl">Jumlah Pemesanan</div>
                                    <div className="text-xs font-outfit">Akumulasi pemesanan diseluruh partner</div>
                                    <div className="flex justify-end w-full text-6xl items-end h-24">{dataBooking.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center pt-8 ">
                            <div className="font-rowdies text-2xl">Kunci Sukses Operasional Hotel Anda dalam Satu Tampilan</div>
                            <div className="text-xs font-outfit text-center px-10 pt-4">Dengan dashboard ini, Anda dapat menggali lebih dalam preferensi tamu, sehingga Anda dapat menargetkan mereka dengan penawaran yang lebih relevan dan meningkatkan tingkat kepuasan mereka.</div>
                        </div>
                    </div>
                </div>
            )}
            {hotel && (
                <div className="text-black  w-full h-screen flex flex-col p-6">
                    <div className="font-rowdies text-3xl pt-4">Hotel</div>
                    <div className="flex flex-row justify-between  items-end">
                        <form action="" className="flex justify-between mt-8">
                            <div className="flex flex-row items-center">
                                <input type="text" className="h-8 border-2 border-black p-2 font-rowdies rounded-s-lg text-xs" placeholder="Cari ...."/>
                                <button className="bg-yellow-400 w-9  h-8 p-1 border-2 border-black rounded-e-lg border-l-0">
                                    <Search size={20}/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        <table className="w-full border-2 border-black text-xs">
                            <tr className="bg-blue-600 text-white">
                                <th className="border-2 border-black">Name</th>
                                <th className="border-2 border-black">Type</th>
                                <th className="border-2 border-black">City</th>
                                <th className="border-2 border-black">Address</th>
                                <th className="border-2 border-black">Price</th>
                                <th className="border-2 border-black">Picture</th>
                                <th className="border-2 border-black p-2">Room Available</th>
                                <th className="border-2 border-black p-2">Email</th>
                                <th className="border-2 border-black">Action</th>
                            </tr>
                            {currentItems.map((hotel) => (
                                <tr key={hotel.id} className="font-outfit text-center">
                                    <td className="border-2 border-black p-2">{hotel.name}</td>
                                    <td className="border-2 border-black p-2">{hotel.type}</td>
                                    <td className="border-2 border-black p-2">{hotel.city}</td>
                                    <td className="border-2 border-black p-2">{hotel.address}</td>
                                    <td className="border-2 border-black p-2">{hotel.price}</td>
                                    <td className="border-2 border-black p-1">
                                        <div className="flex justify-center items-center">
                                            <img src={hotel.picture} alt="" className="w-20 "/>   
                                        </div> 
                                    </td>
                                    {/* <td className="border-2 border-black p-2">{hotel.description}</td> */}
                                    <td className="border-2 border-black w-20 p-2">{hotel.roomAvailable}</td>
                                    <td className="border-2 border-black w-20 p-2">{hotel.email}</td>
                                    <td className="border-2 border-black w-20 p-2">
                                        <div className="flex flex-row gap-2 justify-center font-rowdies p-2">
                                            <button
                                                onClick={() => {
                                                    setEditDataHotel(hotel);
                                                    setPopUpEdit(true)
                                                }}
                                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Apakah anda yakin ingin menghapus data hotel ${hotel.name}?`)) {
                                                        if (confirm(`Jika anda menghapus data hotel ${hotel.name}, maka semua pemesanan di hotel tersebut akan dihapus, Apakah anda ingin tetap melanjutkannya?`)) {
                                                            alert(`Data ${hotel.name} berhasil di hapus`);
                                                            fetch(`http://localhost:8084/api/hotel/${hotel.id}`,{
                                                                method: "DELETE"
                                                            }).then((response) => {
                                                                if(response.ok){
                                                                    setDataHotel(dataHotel.filter((h) => h.id !== hotel.id));
                                                                    location.reload();
                                                                }
                                                            })
                                                        }
                                                    }
                                                }}  
                                                className="p-2 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <div className="flex justify-center mt-4 font-rowdies text-xs">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                            >
                                Previous
                            </button>
                            {Array.from({ length: Math.ceil(dataHotel.length / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white w-8' : 'bg-gray-300 text-black w-8'} rounded hover:bg-gray-400`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(dataHotel.length / itemsPerPage)}
                                className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {visitor && (
                <div className="text-black  w-full h-screen flex flex-col p-6">
                    <div className="font-rowdies text-3xl pt-4">Visitor</div>
                    <div className="flex flex-row justify-between  items-end">
                        <form action="" className="flex justify-between mt-8">
                            <div className="flex flex-row items-center">
                                <input type="text" className="h-8 border-2 border-black p-2 font-rowdies rounded-s-lg text-xs" placeholder="Cari ...."/>
                                <button className="bg-yellow-400 w-9  h-8 p-1 border-2 border-black rounded-e-lg border-l-0">
                                    <Search size={20}/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        <table className="w-full border-2 border-black text-xs">
                            <tr className="bg-blue-600 text-white">
                                <th className="border-2 border-black">Id</th>
                                <th className="border-2 border-black">Name</th>
                                <th className="border-2 border-black">Age</th>
                                <th className="border-2 border-black">Address</th>
                                <th className="border-2 border-black">Email</th>
                                <th className="border-2 border-black">Password</th>
                                <th className="border-2 border-black">Phone</th>
                                <th className="border-2 border-black p-2">Action</th>
                            </tr>
                            {dataVisitor.map((guest) => (
                                <tr key={guest.id} className="font-noto text-center text-xs">
                                    <td className="border-2 border-black">{guest.id}</td>
                                    <td className="border-2 border-black">{guest.firstName} {guest.lastName}</td>
                                    <td className="border-2 border-black">{guest.age}</td>
                                    <td className="border-2 border-black">{guest.address}</td>
                                    <td className="border-2 border-black">{guest.email}</td>
                                    <td className="border-2 border-black">
                                        {"*".repeat(guest.password.length)}
                                    </td>
                                    <td className="border-2 border-black">{guest.phone}</td>
                                    <td className="border-2 border-black p-2">
                                        <div className="flex flex-row gap-2 justify-center">
                                            <button
                                                onClick={() => {
                                                    setEditDataVisitor(guest);
                                                    setPopUpEditVisitor(true);
                                                }}
                                                className="p-2 bg-blue-600 text-white rounded font-rowdies">Edit</button>
                                            <button 
                                                onClick={() => {
                                                    fetch(`http://localhost:8084/api/customer/${guest.id}`,{
                                                        method: "DELETE"
                                                    }).then((response) => {
                                                        if(response.ok){
                                                            setDataVisitor(dataVisitor.filter((v) => v.id !== guest.id))
                                                        }
                                                    })
                                                }}  
                                                className="p-2 bg-red-600 text-white rounded font-rowdies"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            )}
            {booking && (
                <div className="text-black  w-full h-screen flex flex-col p-6">
                    <div className="font-rowdies text-3xl pt-4">Pemesanan Hotel</div>
                    <div className="flex flex-row justify-between  items-end">
                        <form action="" className="flex justify-between mt-8">
                            <div className="flex flex-row items-center">
                                <input 
                                    type="text" 
                                    className="h-8 border-2 border-black p-2 font-rowdies rounded-s-lg text-xs" 
                                    placeholder="Cari ...."
                                />
                                <button className="bg-yellow-400 w-9  h-8 p-1 border-2 border-black rounded-e-lg border-l-0">
                                    <Search size={20}/>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        <table className="w-full border-2 border-black text-xs">
                            <tr className="bg-blue-600 text-white">
                                <th className="border-2 border-black">Nama Tamu</th>
                                <th className="border-2 border-black">Nama Hotel</th>
                                <th className="border-2 border-black">Tanggal Check In</th>
                                <th className="border-2 border-black">Tanggal Check Out</th>
                                <th className="border-2 border-black">Jumlah Tamu</th>
                                <th className="border-2 border-black">Lama Menginap</th>
                                <th className="border-2 border-black">Total Harga</th>
                                <th className="border-2 border-black p-2">Action</th>
                            </tr>
                            {dataBooking && dataBooking.length > 0 ?
                                dataBooking.map((book) => (
                                    <tr key={book.id} className="font-noto text-center text-xs">
                                        <td className="border-2 border-black">{book.customerId.firstName} {book.customerId.lastName}</td>
                                        <td className="border-2 border-black">{book.hotelId.name}</td>
                                        <td className="border-2 border-black">{book.checkIn}</td>
                                        <td className="border-2 border-black">{book.checkOut}</td>
                                        <td className="border-2 border-black">{book.numberOfGuest}</td>
                                        <td className="border-2 border-black">{book.nights}</td>
                                        <td className="border-2 border-black">Rp. {book.totalPrice.toLocaleString('id-ID')}</td>
                                        <td className="border-2 border-black p-2 font-rowdies">
                                            <button 
                                                onClick={() => {
                                                    setPopUpEditBooking(true);
                                                    setDataPopUpBooking(book);
                                                }}
                                                className="bg-blue-600 text-white p-2 rounded mr-2">Edit</button>
                                            <button
                                                onClick={() => {
                                                    fetch(`http://localhost:8084/api/booking/${book.id}`,{
                                                        method: "DELETE"
                                                    }).then((response) => {
                                                        if(response.ok){
                                                            setDataBooking(dataBooking.filter((b) => b.id !== book.id))
                                                        }
                                                    })
                                                }}  
                                                className="p-2 bg-red-600 text-white rounded ">Hapus</button>
                                        </td>
                                    </tr>
                                ))
                                    :
                                <tr>
                                    <td colSpan={8} className="font-outfit text-red-600 font-bold text-center w-full p-4">Belum ada pemesanan</td>
                                </tr>
                            }
                        </table>
                    </div>
                </div>
            )}
        </div>
    </div>
}