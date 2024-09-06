import { AirVent, SquareParking, UtensilsCrossed, Waves, Wifi } from "lucide-react";
import HeaderSearch from "../components/HeaderSearch";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { TbDisabled, TbHours24 } from "react-icons/tb";
import { useEffect, useState } from "react";

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

export default function Booking() {
  const [hotel, setHotel] = useState<Hotel>()

  useEffect(() => {
    fetch(`http://localhost:8084/api/hotel/byid/${localStorage.getItem('hotel')}`)
        .then((response) => response.json())
        .then((data) => setHotel(data));
}, [])

  return (
    <>
      <HeaderSearch />
      <img src={hotel?.picture} alt=""className="w-full"/>
      <div className="flex flex-col h-auto w-full -mt-64">
        <div className="flex flex-col p-4 w-full bg-white rounded-3xl">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="font-rowdies text-3xl p-4">
                {hotel?.name}
              </div>
              <div className="px-4 text-yellow-400 flex flex-row items-center">
                <div className="w-20 h-6 flex justify-center items-center text-black bg-blue-200 rounded font-outfit mr-2">
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
            <div className="w-1/3 h-60 bg-gray-100 rounded-xl px-4">
              <div className="font-rowdies text-lg pt-4 flex justify-between">
                <div>Kesan Tamu Lain</div>
                <div className="text-blue-600">8/10</div>
              </div>
              <div className="font-outfit text-sm pt-4 font-bold">
                Romi Kusuma Bakti
              </div>
              <div className="font-outfit text-xs pt-2">
                During Check in sampai check out kita semua keluarga senang
                dengan apa yang ada di sana. Staff, food, ambiance, view, pool
                semuanya execellent. Bakalan dateng lagi kesini sama keluarga!
                Karena hotelnya cocok banget buat staycation barang keluarga.
                Dan thank you gaia undh upgrade kamar kita dengan segala
              </div>
            </div>
            <div className="w-1/3 h-60 bg-gray-100 rounded-xl px-4">
              <div className="font-rowdies text-lg pt-4">Tentang Hotel</div>
              <div className="font-outfit text-sm pt-2 text-justify">
                {hotel?.description}
              </div>
            </div>
            <div className="w-1/3 h-60 bg-gray-100 rounded-xl px-4">
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
        </div>
      </div>
    </>
  );
}
