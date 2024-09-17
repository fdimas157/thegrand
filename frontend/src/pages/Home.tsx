import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface SearchHotel {
  city: string;
  checkIn: string;
  checkOut: string;
  numberOfGuest: number;
  numberOfDays: number;
}

export default function Home() {
  const [searchHotel, setSearchHotel] = useState<SearchHotel>({
    city: "",
    checkIn: "",
    checkOut: "",
    numberOfGuest: 0,
    numberOfDays: 0,
  })
  const [city, setCity] = useState<string>("Jakarta");
  const hotelDipslay = [
    {
      id: 1,
      city: "Jakarta",
      pic: "/src/assets/hotel/hotel1.png",
      name: "El Jakarta Hotel",
      place: "Kelapa Gading, Jakarta",
      priceBefore: "Rp. 300.000",
      priceAfter: "Rp. 234.599"
    },
    {
      id: 2,
      city: "Bandung",
      pic: "/src/assets/hotel/hotel2.png",
      name: "Grand Solvakia",
      place: "Dago, Bandung",
      priceBefore: "Rp. 649.999",
      priceAfter: "Rp. 524.999"
    },
    {
      id: 3,
      city: "Surabaya",
      pic: "/src/assets/hotel/hotel3.png",
      name: "Surya Yudha Hotel",
      place: "Simokerto, Surabaya",
      priceBefore: "Rp. 250.000",
      priceAfter: "Rp. 174.599"
    },
    {
      id: 4,
      city: "Medan",
      pic: "/src/assets/hotel/hotel4.png",
      name: "Grand Kanaya",
      place: "Sibolga, Medan",
      priceBefore: "Rp. 299.999",
      priceAfter: "Rp. 209.599"
    },
    {
      id: 5,
      city: "Jakarta",
      pic: "/src/assets/hotel/hotel1.png",
      name: "OYO Persimpangan",
      place: "Sarinah, Jakarta Pusat",
      priceBefore: "Rp. 150.000",
      priceAfter: "Rp. 94.599"
    },
    {
      id: 6,
      city: "Yogyakarta",
      pic: "/src/assets/hotel/hotel6.png",
      name: "OYO Jl. Malioboro",
      place: "Malioboro, Yogyakarta",
      priceBefore: "Rp. 180.000",
      priceAfter: "Rp. 104.999"
    },
  ]
  const navigate = useNavigate();
  const date = new Date();
  date.setDate(date.getDate() + 1);
  // const tomorrow = date.toISOString().split('T')[0];
  // const today = new Date().toISOString().split('T')[0];
  const [numberOfDays, setNumberOfDays] = useState(0);
  
  
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <img src="/src/assets/room/room2.jpg" alt="" />
        </div>
        <div className="text-white flex flex-col gap-1 absolute bottom-36">
          <p className="font-noto font-extrabold text-4xl ">
            Booking hotel dengan harga murah di {city}
          </p>
          <p className="text-center">
            Wujudkan perjalanan impianmu, eksplor pilihan hotel terbaik di {city}
          </p>
        </div>
        <div className="w-3/4 h-28 bg-white rounded-xl flex justify-center items-center absolute bottom-0 shadow-xl">
        <form
            action=""
            className="flex justify-center items-center font-noto text-center"
          >
            <table>
              <tbody>
                <tr className="font-bold text-sm"> 
                  <td>Kota</td>
                  <td>Tanggal Check-In</td>
                  <td>Tanggal Check-Out</td>
                  <td>Jumlah Tamu</td>
                </tr>
                <tr className="font-outfit">
                  <td className="border border-black w-1/4">
                    <select 
                      onChange={(e) => {
                        setCity(e.target.value);
                        setSearchHotel({...searchHotel, city: e.target.value});
                        localStorage.setItem("city", e.target.value);
                      }}
                      className="w-full px-2 focus:outline-none"
                    >
                      <option value="">Pilih Kota</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Surabaya">Surabaya</option>
                      <option value="Bandung">Bandung</option>
                      <option value="Yogyakarta">Yogyakarta</option>
                      <option value="Medan">Medan</option>
                    </select>
                  </td>
                  <td className="border border-black w-1/4">
                    <input
                      type="date"
                      required
                      value={searchHotel.checkIn}
                      onChange={(e) => {
                        const newCheckIn = e.target.value;
                        setSearchHotel(prev => {
                          const newSearchHotel = { ...prev, checkIn: newCheckIn };
                          if (newSearchHotel.checkOut) {
                            const checkInDate = new Date(newSearchHotel.checkIn);
                            const checkOutDate = new Date(newSearchHotel.checkOut);
                            const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
                            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                            setNumberOfDays(differenceInDays);
                          }
                          return newSearchHotel;
                        });
                      }}
                      className="w-full h-8 border-none focus:outline-none px-2"
                    />
                  </td>
                  <td className="border border-black w-1/4">
                    <input
                      type="date"
                      required
                      value={searchHotel.checkOut}
                      onChange={(e) => {
                        const newCheckOut = e.target.value;
                        setSearchHotel(prev => {
                          const newSearchHotel = { ...prev, checkOut: newCheckOut };
                          if (newSearchHotel.checkIn) {
                            const checkInDate = new Date(newSearchHotel.checkIn);
                            const checkOutDate = new Date(newSearchHotel.checkOut);
                            const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
                            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                            setNumberOfDays(differenceInDays);
                          }
                          return newSearchHotel;
                        });
                      }}
                      className="w-full h-8 border-none focus:outline-none px-2"
                    />
                  </td>
                  <td className="border border-black w-1/4">
                    <input
                      type="number"
                      required
                      value={searchHotel.numberOfGuest}
                      onChange={(e) => setSearchHotel({...searchHotel, numberOfGuest: parseInt(e.target.value), numberOfDays: numberOfDays})}
                      className="w-full h-8 border-none focus:outline-none px-2"
                    />
                  </td>
                  <td className="border border-black bg-orange-600 cursor-pointer">
                    <button
                      className="flex justify-center items-center"
                      onClick={() => {
                        if (!searchHotel.checkIn || !searchHotel.checkOut) {
                          alert("Mohon lengkapi data terlebih dahulu");
                          return;
                        }
                        if (!searchHotel.numberOfGuest) {
                          alert("Mohon lengkapi data terlebih dahulu");
                          return;
                        }
                        localStorage.setItem("searchHotel", JSON.stringify(searchHotel));
                        navigate("/search", {state: searchHotel});
                      }}
                    >
                      <Search className=" px-2 w-12 text-white" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="w-full h-auto flex items-center pt-28 gap-4 flex-col">
          <div className="w-10/12 flex flex-col items-center  h-auto">
            <div className="flex items-center gap-4 flex-row justify-start ">
              <img src="/src/assets/room/clock.webp" className="w-12 pl-0" />
              <p className="font-rowdies text-2xl">
                Hilangin penat dengan hemat
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
          <div className="w-10/12 flex flex-col items-center  h-auto">
            <div className="flex items-center gap-4 flex-row justify-start ">
              <img src="/src/assets/room/clock.webp" className="w-12 pl-0" />
              <p className="font-rowdies text-2xl">
                Menikmati keindahan Kota {city}
              </p>
            </div>
            <div>
              <p className="text-center font-noto">
                Jakarta, ibukota Indonesia yang dinamis, adalah perpaduan unik
                antara tradisi dan modernitas. Kota ini menyajikan pesona yang
                tak terlupakan dengan gemerlap lampu malam yang memukau,
                gedung-gedung pencakar langit yang menjulang tinggi, serta
                kekayaan budaya yang begitu beragam.
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between p-8 w-10/12">
            <div className="flex flex-col w-3/4 gap-4">
              <div className="text-left font-rowdies text-xl pb-4">
                Pertanyaan yang sering ditanyakan
              </div>
              <p className="border-b-2 p-2">
                1. Apa saja hotel yang cocok di {city} untuk keluarga?
              </p>
              <p className="border-b-2 p-2">
                2. Apa saja hotel di {city} yang sarapannya enak?
              </p>
              <p className="border-b-2 p-2">
                3. Apa saja hotel yang nyaman dan murah di {city}?
              </p>
              <p className="border-b-2 p-2">
                4. Apa saja tempat terkenal di {city}?
              </p>
              <p className="border-b-2 p-2">
                5. Berapa harga hotel di {city} hari ini?
              </p>
            </div>
            <div className="flex justify-end ">
              <img
                src="/src/assets/room/jakarta.jpg"
                alt=""
                className="w-1/2 rounded-xl"
              />
            </div>
          </div>
          <div className="p-8">
            <img src="/src/assets/room/promo.webp" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
