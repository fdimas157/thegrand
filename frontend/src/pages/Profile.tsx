
import { CircleUser } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import Footer from "../components/Footer";
import PopUpHistoryBooking from "../components/PopUpHistoryBooking";

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    email: string;
    password: string;
    phone: string;
}

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

export interface Booking{
    id?: number,
    checkIn: string,
    checkOut: string,
    numberOfGuest: number,
    totalPrice: number,
    nights: number,
    customerId: User,
    hotelId: Hotel,
  }

export default function Profile(){
    const hotelDipslay = [
    {
      id: 1,
      city: "Sibolga",
      pic: "/src/assets/hotel/hotel1.png",
      name: "An-Nur Hotel",
      place: "Pasar Baru, Sibolga",
      priceBefore: "Rp. 300.000",
      priceAfter: "Rp. 234.599"
    },
    {
      id: 2,
      city: "Sidempuan",
      pic: "/src/assets/hotel/hotel2.png",
      name: "Grand Solvakia",
      place: "Sipirok, Sidempuan",
      priceBefore: "Rp. 649.999",
      priceAfter: "Rp. 524.999"
    },
    {
      id: 3,
      city: "Barus",
      pic: "/src/assets/hotel/hotel3.png",
      name: "Surya Yudha Hotel",
      place: "Jl. Imam Bonjol, Barus",
      priceBefore: "Rp. 250.000",
      priceAfter: "Rp. 174.599"
    },
    {
      id: 4,
      city: "Pinang Sori",
      pic: "/src/assets/hotel/hotel4.png",
      name: "Grand Kanaya",
      place: "Sibolga, Medan",
      priceBefore: "Rp. 299.999",
      priceAfter: "Rp. 209.599"
    },
    {
      id: 5,
      city: "Pandan",
      pic: "/src/assets/hotel/hotel1.png",
      name: "OYO Persimpangan",
      place: "Batutu, Pandan",
      priceBefore: "Rp. 150.000",
      priceAfter: "Rp. 94.599"
    },
    {
      id: 6,
      city: "Sibolga",
      pic: "/src/assets/hotel/hotel6.png",
      name: "OYO Jl. Simatupang",
      place: "Simatupang, Sibolga",
      priceBefore: "Rp. 180.000",
      priceAfter: "Rp. 104.999"
    },
  ]
    const [user, setUser] = useState<User>({
        id: parseInt(localStorage.getItem('customerId') || '0'),
        firstName: "",
        lastName: "",
        age: 0,
        address: "",
        email: "",
        password: "",
        phone: ""
    });
    const navigate = useNavigate();
    const [popUpEditProfile, setPopUpEditProfile] = useState<boolean>(false);
    const [historyBooking, setHistoryBooking] = useState<Booking[]>([]);
    const [bookingDetail, setBookingDetail] = useState<Booking>({});
    const [popUpDetail, setPopUpDetail] = useState<boolean>(false);

    useEffect(() => {
        const userEmail = localStorage.getItem('user') || '';
        if (userEmail) {
          fetch(`http://localhost:8084/api/customer/byemail/${encodeURIComponent(userEmail)}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch user data");
              }
              return response.json();
            })
            .then((data) => setUser(data))
            .catch((error) => {
              console.error("Error fetching user:", error);
            });
        }
    }, []);

    useEffect(() => {
        // Pastikan user.id terdefinisi sebelum melakukan fetch
        if (user && user.id) {
            fetch(`http://localhost:8084/api/booking/bycust/${user.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch booking history");
                    }
                    return response.json();
                })
                .then((data) => {
                    setHistoryBooking(data);
                })
                .catch((error) => {
                    console.error("Error fetching booking history:", error);
                });
        }
    }, [user]);
    

    console.log(historyBooking);
    

    return <>
        {popUpDetail && (
            <PopUpHistoryBooking bookingDetail={bookingDetail} setHistoryBooking={setHistoryBooking} historyBooking={historyBooking} setPopUpDetail={setPopUpDetail}/>
        )}
        <Header />
        <div className="flex flex-row w-full h-auto">
            <div className="w-1/3 flex flex-col p-4 gap-4 items-center">
                <div className="font-rowdies text-2xl text-center">Data Pengguna</div>
                <CircleUser 
                    className=""
                    size={120}
                />
                <table className="font-rowdies text-sm w-4/5 ">
                    <tr>
                        <td className="w-2/5 p-2">Nama Depan</td>
                        <td className="w-3/5 p-2">: {user.firstName}</td>
                    </tr>
                    <tr>
                        <td className="w-2/5 p-2">Nama Belakang</td>
                        <td className="w-3/5 p-2">: {user.lastName}</td>
                    </tr>
                    <tr>
                        <td className="w-2/5 p-2">Usia</td>
                        <td className="w-3/5 p-2">: {user.age}</td>
                    </tr>
                    <tr>
                        <td className="w-2/5 p-2">Alamat</td>
                        <td className="w-3/5 p-2">: {user.address}</td>
                    </tr>
                    <tr>
                        <td className="w-2/5 p-2">Email</td>
                        <td className="w-3/5 p-2">: {user.email}</td>
                    </tr>
                    <tr>
                        <td className="w-2/5 p-2">Password</td>
                        <td className="w-3/5 p-2">: {"*".repeat(user.password.length)}</td>
                    </tr>
                </table>
                <button 
                    className="bg-blue-600 text-white p-2 rounded-lg font-rowdies w-48"
                    onClick={() => setPopUpEditProfile(!popUpEditProfile)}
                >
                    Edit Data
                </button>
                <p 
                    className="font-rowdies underline"
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate("/login");
                    }}
                >
                    Keluar
                </p>
                {
                    popUpEditProfile ? <EditProfile user={{ ...user, id: user.id || 0 }} setPopUpEditProfile={setPopUpEditProfile}/> : null
                }
            </div>
            <div className="w-4/6 flex flex-col gap-2">
                <div className="font-rowdies p-4 text-xl">Histori Pemesanan</div>
                <div className="px-4">
                    {
                        historyBooking && historyBooking.length > 0 ?
                            historyBooking.map((h) => (
                                <div className="bg-blue-100 h-56 rounded-xl flex flex-row p-4 mb-2">
                                    <img src={h.hotelId.picture} alt="" className="rounded-xl "/>
                                    <div className="flex flex-col gap-1">
                                        <div className="px-4 font-rowdies text-xl">{h.hotelId.name}</div>
                                        <div className="px-4 flex flex-row items-center gap-2 pb-5">
                                            <div className="font-outfit font-bold text-sm">{h.hotelId.address}, {h.hotelId.city}</div>
                                            <div className="font-outfit text-xs bg-blue-300 w-20 text-center rounded-lg">{h.hotelId.type}</div>
                                        </div>
                                        <div className="text-xs font-outfit px-4 font-bold">Kode Booking: {h.id}</div>
                                        <table className="text-xs font-outfit">
                                            <tr>
                                                <td className="px-4 w-36">Tanggal Check In</td>
                                                <td>: {h.checkIn}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 w-36">Tanggal Check Out</td>
                                                <td>: {h.checkOut}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 w-36">Jumlah Tamu</td>
                                                <td>: {h.numberOfGuest} orang, {h.nights} malam</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 w-36 font-rowdies text-lg">Total Harga</td>
                                                <td className="font-rowdies text-lg w-40">: Rp. {h.totalPrice.toLocaleString('id-ID')}</td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            setPopUpDetail(true);
                                                            setBookingDetail(h);
                                                        }} 
                                                        className="bg-blue-600 text-white p-2 rounded-lg font-rowdies ml-6 hover:bg-blue-700 px-4">Lihat Detail</button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            ))
                        :
                            (
                                <div className="px-4 font-outfit">Anda belum memesan hotel</div>
                            )
                    }
                </div>
                <div className="font-rowdies p-4 text-xl">Peraturan Wajib Tamu</div>
                <div className="font-outfit text-sm">
                    <ol className="px-4 list-decimal list-inside flex flex-col gap-2" type="1">
                        <li>Waktu check-in dimulai pukul 14.00, dan waktu check-out maksimal pukul 12.00.</li>
                        <li>Permintaan late check-out harus dikonfirmasi terlebih dahulu dan dapat dikenakan biaya tambahan.</li>
                        <li>Setiap tamu wajib menunjukkan kartu identitas yang sah (KTP/SIM/Paspor) saat check-in.</li>
                        <li>Hotel berhak menolak tamu yang tidak dapat memberikan identitas valid.</li>
                        <li>Pembayaran penuh harus dilakukan saat check-in atau sesuai dengan perjanjian.</li>
                        <li>Untuk reservasi online, tamu harus menunjukkan bukti pembayaran atau konfirmasi reservasi.</li>
                        <li>Jumlah tamu yang menginap di setiap kamar tidak boleh melebihi kapasitas yang telah ditentukan.</li>
                        <li>Tamu tambahan yang tidak terdaftar akan dikenakan biaya ekstra.</li>
                        <li>Tamu bertanggung jawab untuk menjaga kebersihan kamar dan fasilitas yang digunakan.</li>
                        <li>Kerusakan atau kehilangan properti hotel yang disebabkan oleh tamu akan dikenakan biaya penggantian sesuai dengan nilai kerusakan.</li>
                        <li>Dilarang merokok di area kamar hotel yang ditetapkan sebagai non-smoking.</li>
                        <li>Merokok hanya diperbolehkan di area merokok yang telah ditentukan.</li>
                        <li>Tamu diharapkan menjaga ketenangan, terutama setelah pukul 22.00.</li>
                        <li>Aktivitas yang menimbulkan kebisingan atau mengganggu tamu lain tidak diperbolehkan.</li>
                        <li>Tamu disarankan untuk menyimpan barang berharga di dalam brankas yang tersedia di kamar atau di meja resepsionis.</li>
                        <li>Hotel tidak bertanggung jawab atas kehilangan barang berharga yang tidak disimpan dengan aman.</li>
                        <li>Hewan peliharaan tidak diperbolehkan masuk ke area hotel, kecuali dinyatakan sebaliknya.</li>
                        <li>Fasilitas hotel (kolam renang, gym, restoran, dll.) hanya boleh digunakan oleh tamu terdaftar.</li>
                        <li>Penggunaan fasilitas hotel harus sesuai dengan aturan dan waktu operasional yang berlaku.</li>
                        <li>Hotel tidak bertanggung jawab atas kehilangan barang pribadi atau kecelakaan yang terjadi di dalam area hotel akibat kelalaian tamu.</li>
                        <li>Tamu harus mematuhi prosedur keselamatan dan evakuasi yang diberikan oleh hotel, terutama dalam keadaan darurat.</li>
                        <li>Penggunaan api terbuka seperti lilin dan kompor di dalam kamar dilarang untuk alasan keamanan.</li>
                        <li>Kegiatan ilegal seperti perjudian, penggunaan obat-obatan terlarang, atau aktivitas lainnya yang melanggar hukum dilarang keras di area hotel.</li>
                        <li>Pelanggaran aturan ini dapat mengakibatkan tindakan hukum dan pemutusan masa inap secara sepihak oleh pihak hotel.</li>
                    </ol>
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-8">
            <div className="w-10/12 flex flex-col items-center  h-auto">
                <div className="flex items-center gap-4 flex-row justify-start ">
                <img src="/src/assets/room/clock.webp" className="w-12 pl-0" />
                <p className="font-rowdies text-2xl text-blue-600">
                    Ayo lihat promo menarik lainnya
                </p>
                </div>
                <div>
                <p className="text-sm font-noto">
                    Serbu diskon hingga 40% + cashback 3% buat hotel di seluruh
                    Indonesia!
                </p>
                </div>
            </div>
            <div className="flex flex-wrap flex-row gap-4 p-4 justify-center">
            {hotelDipslay.map((hotel) => (
              <div key={hotel.id} className="w-44 h-72 rounded-xl shadow-xl p-2 flex flex-col items-center">
                <div className="font-rowdies text-xl">{hotel.city}</div>
                <img src={hotel.pic} alt="" className="pt-2 rounded w-full"/>
                <div className="font-rowdies pt-2 text-center">{hotel.name}</div>
                <div className="font-noto text-xs text-center">{hotel.place}</div>
                <div className="font-rowdies pt-4 text-sm line-through decoration-red-600">{hotel.priceBefore}</div>
                <div className="font-rowdies text-red-600">{hotel.priceAfter}</div>
                <div className="font-noto text-xs text-gray-500">Belum termasuk pajak</div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
    </>
}