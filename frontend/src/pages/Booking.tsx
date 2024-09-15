import { AirVent, AlarmClock, ChevronDown, SquareParking, UtensilsCrossed, Waves, Wifi, } from "lucide-react";
import HeaderSearch from "../components/HeaderSearch";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { TbDisabled, TbHours24 } from "react-icons/tb";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export interface SearchHotel {
  city: string;
  checkIn: string;
  checkOut: string;
  numberOfGuest: number;
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
  id?: number,
  checkIn: string,
  checkOut: string,
  numberOfGuest: number,
  totalPrice: number,
  customerId: {
    id:number
  },
  hotelId: {
    id:number
  },
}

export default function Booking() {
  const [hotel, setHotel] = useState<Hotel>()
  const [visitor, setVisitor] = useState<Visitor>({})
  const priceHotel = Number(localStorage.getItem("priceHotel"))
  const tax = Math.ceil(priceHotel * 0.05 + 150000);
  const totalPrice = Math.ceil(priceHotel + tax);
  const storedData = localStorage.getItem("searchHotel") || "{}";
  const { checkIn, checkOut, numberOfGuest } = JSON.parse(storedData);
  const [booking, setBooking] = useState<Booking>({
    checkIn: checkIn,
    checkOut: checkOut,
    numberOfGuest: numberOfGuest,
    totalPrice: totalPrice,
    customerId: {
      id: Number(localStorage.getItem("customerId")),
    },
    hotelId: {
      id: Number(localStorage.getItem("hotelId")),
    }
  })
  console.log(booking);
  

  useEffect(() => {
    fetch(`http://localhost:8084/api/hotel/byid/${localStorage.getItem('hotel')}`)
        .then((response) => response.json())
        .then((data) => {
          setHotel(data)
          localStorage.setItem("hotelId", data.id.toString());
          localStorage.setItem("priceHotel", data.price.toString());
        });
  }, [])

  useEffect(() => {
    fetch(`http://localhost:8084/api/customer/byemail/${localStorage.getItem('user')}`)
        .then((response) => response.json())
        .then((data) => {
          setVisitor(data)
          localStorage.setItem("customerId", data.id.toString());
        });
  }, [])




  return (
    <>
      <HeaderSearch />
      <img src={hotel?.picture} alt=""className="w-full"/>
      <div className="flex flex-col h-auto w-full absolute top-3/4">
        <div className="flex flex-col p-4 w-full bg-gray-100 rounded-3xl">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="font-rowdies text-3xl p-4">
                {hotel?.name}
              </div>
              <div className="px-4 text-yellow-400 flex flex-row items-center">
                <div className="w-auto px-4 h-6 flex justify-center items-center text-black bg-blue-200 rounded font-outfit mr-2">
                  {hotel?.type}
                </div>
                <IoStar size={28} />
                <IoStar size={28} />
                <IoStar size={28} />
                <IoStar size={28} />
                <IoStarHalf size={28} />
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center pr-4">
              <div className="flex flex-col items-end">
                <div className="text-xs font-outfit">
                  Harga/Kamar/Mulai Dari
                </div>
                <div className="font-rowdies text-2xl">Rp. {hotel?.price.toLocaleString('id-ID')}</div>
              </div>
              <button className="w-36 h-12 bg-orange-500 font-rowdies rounded-lg text-white hover:bg-orange-600">
                Pesan Sekarang
              </button>
            </div>
          </div>
          <div className="flex flex-row p-4 gap-4">
            <div className="w-1/3 h-60 bg-white rounded-xl px-4">
              <div className="font-rowdies text-lg pt-4 flex justify-between">
                <div>Kesan Tamu Lain</div>
                <div className="text-blue-600">8/10</div>
              </div>
              <div className="font-outfit text-sm pt-4 font-bold">
                Romi Kusuma Bakti
              </div>
              <div className="font-outfit text-sm pt-2">
                During Check in sampai check out kita semua keluarga senang
                dengan apa yang ada di sana. Staff, food, ambiance, view, pool
                semuanya execellent. Bakalan dateng lagi kesini sama keluarga!
                Karena hotelnya cocok banget buat staycation barang keluarga.
                Dan thank you gaia undh upgrade kamar kita dengan segala
              </div>
            </div>
            <div className="w-1/3 h-60 bg-white rounded-xl px-4">
              <div className="font-rowdies text-lg pt-4">Tentang Hotel</div>
              <div className="font-outfit text-sm pt-2 text-justify">
                {hotel?.description}
              </div>
            </div>
            <div className="w-1/3 h-60 bg-white rounded-xl px-4">
              <div className="font-rowdies text-lg pt-4">Fasilitas Hotel</div>
              <div className="flex flex-row p-2 gap-4">
                <div className="flex flex-col gap-4 w-1/2">
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <AirVent size={28} className="text-blue-600"/>
                    <div>AC</div>
                  </div>
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <UtensilsCrossed size={28} className="text-blue-600"/>
                    <div>Restoran</div>
                  </div>
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <Waves size={28} className="text-blue-600"/>
                    <div>Kolam Renang</div>
                  </div>
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <TbHours24 size={28} className="text-blue-600"/>
                    <div>Resepsionis 24 Jam</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <SquareParking size={28} className="text-blue-600"/>
                    <div>Parkir</div>
                  </div>
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <Wifi size={28} className="text-blue-600"/>
                    <div>Wifi</div>
                  </div>
                  <div className="flex flex-row gap-2 font-rowdies items-center text-sm">
                    <TbDisabled size={28} className="text-blue-600"/>
                    <div>Akses Mudah</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="w-full h-64 bg-white rounded-xl">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col  p-4 items-center w-1/3">
                  <div className="font-rowdies text-xl p-3">Pertanyaan yang sering ditanyakan di {hotel?.name}</div>
                  <img src="/src/assets/other/text.svg" className="w-28" />
                </div>
                <div className="w-2/3 flex flex-col justify-center p-4 gap-2">
                  <div className="w-full h-14 shadow font-rowdies flex p-4 items-center rounded-xl justify-between">
                    <p>Fasilitas apa saja yang tersedia di {hotel?.name}?</p>
                    <ChevronDown className="text-blue-600"/>
                  </div>
                  <div className="w-full h-14 shadow font-rowdies flex p-4 items-center rounded-xl justify-between">
                    <p>Kapan waktu yang tepat untuk menginap di {hotel?.name}?</p>
                    <ChevronDown className="text-blue-600"/>
                  </div>
                  <div className="w-full h-14 shadow font-rowdies flex p-4 items-center rounded-xl justify-between">
                    <p>Apakah hotel {hotel?.name} menyediakan sarapan?</p>
                    <ChevronDown className="text-blue-600"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="w-full h-40 bg-gradient-to-r from-blue-800 to-blue-500 rounded-xl flex flex-col justify-center px-10 gap-1 font-rowdies text-white">
              <p>SIAP WUJUDKAN KEINGINANMU?</p>
              <button className="bg-orange-500 w-40 text-sm font-outfit font-bold h-8 rounded-lg">Booking Sekarang</button>
            </div>
          </div>
          <form className="p-4 flex flex-row gap-4 w-full">
            <div className="w-2/3 bg-white rounded-xl flex flex-col pb-4">
              <p className="text-2xl font-outfit font-bold p-4">Data Pemesanan (Booking)</p>
              <div className="flex flex-col font-outfit gap-2">
                <div className="px-2 flex gap-2 flex-row font-bold">
                  <label htmlFor="" className="flex flex-col w-full px-2 "> Nama Depan
                    <input type="text" className="h-10 border-2 border-black rounded-lg px-2 text-sm" value={visitor.firstName} disabled/>
                  </label>
                  <label htmlFor="" className="flex flex-col w-full px-2 "> Nama Belakang
                    <input type="text" className="h-10 border-2 border-black rounded-lg px-2 text-sm" value={visitor.lastName} disabled/>
                  </label>
                </div>
                <div className="px-2 flex gap-2 flex-row font-bold">
                  <label htmlFor="" className="flex flex-col w-full px-2 " > Usia
                    <input type="text" className="h-10 border-2 border-black rounded-lg px-2 text-sm" value={visitor.age} disabled/>
                  </label>
                  <label htmlFor="" className="flex flex-col w-full px-2 "> No. Handphone
                    <input type="text" className="h-10 border-2 border-black rounded-lg px-2 text-sm" value={visitor.phone} disabled/>
                  </label>
                </div>
                <div className="px-2 font-bold">
                  <label htmlFor="" className="flex flex-col w-full px-2 "> Alamat
                    <input type="text" className="h-10 border-2 border-black rounded-lg px-2 text-sm" value={visitor.address} disabled/>
                  </label>
                </div>
                <div className="px-2 p-2">
                  <label htmlFor="" className="flex flex-row gap-4 w-full px-4 text-sm text-justify">
                    <input type="checkbox" className="h-8 w-8 cursor-pointer"/>
                      Dengan ini, saya menyetujui semua syarat dan ketentuan yang berlaku untuk pemesanan kamar di {hotel?.name}. Saya juga bersedia menerima informasi terkait kamar ini melalui e-mail.                  </label>
                </div>
              </div>
            </div>
            <div className="w-1/3 h-auto bg-white rounded-xl flex flex-col font-outfit">
              <p className="text-2xl font-bold pl-4 pt-4 p-1">Rincian Harga</p>
              <p className="text-green-600 px-4 text-justify text-xs font-bold">Gunakan kupon di halaman pembayaran untuk harga yang lebih murah</p>
              <div className="flex flex-col p-4">
                <div className="flex flex-row justify-between text-lg">
                  <p>Harga Kamar</p>
                  <p>Rp. {hotel?.price.toLocaleString('id-ID')}</p>
                </div>
                <p className="text-xs text-gray-500">{hotel?.city}: {hotel?.name} ({numberOfGuest} orang)</p>
                <div className="flex flex-row justify-between text-lg pt-8">
                  <p>Pajak dan Biaya</p>
                  <p>Rp. {tax.toLocaleString('id-ID')}</p>
                </div>
                <hr className="mt-2"/>
                <div className="flex flex-row justify-between text-lg pt-2 font-bold">
                  <p>Pajak dan Biaya</p>
                  <p>Rp. {totalPrice.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex justify-center pt-4 flex-col items-center gap-2">
                  <p className="text-xs text-blue-600 font-bold flex flex-row gap-2 items-center"><AlarmClock size={16}/>Pesan sekarang sebelum harga berubah!</p>
                  <button onClick={async (e) => {
                    e.preventDefault();
                    try {
                        const customerResponse = await fetch("http://localhost:8084/api/booking/add", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(booking),
                        });
                        if (!customerResponse.ok) {
                            throw new Error(`Error: ${customerResponse.status} ${customerResponse.statusText}`);
                        }
                        const customerResult = await customerResponse.json();
                        console.log("Customer created successfully:", customerResult);
                        alert("Booking success");
                    } catch (error) {
                        console.error("Error occurred:", error);
                        alert("Failed to submit data. Please try again later.");
                    }
                }}
                    className="bg-orange-500 w-40 text-sm font-outfit font-bold h-10 rounded-lg text-white">Booking Sekarang</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
