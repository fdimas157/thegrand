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
  const [city, setCity] = useState<string>("Sibolga");
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
  const navigate = useNavigate();
  const date = new Date();
  date.setDate(date.getDate() + 1);
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
        <div className="h-28 bg-white rounded-xl flex justify-center items-center absolute bottom-0 shadow-xl w-3/4">
        <form
            action=""
            className="flex justify-center items-center font-noto text-center"
          >
            <table>
              <tbody>
                <tr className="font-bold text-sm"> 
                  <td >Kota</td>
                  <td>Tanggal Check-In</td>
                  <td>Tanggal Check-Out</td>
                  <td className="w-full">Jumlah Tamu</td>
                </tr>
                <tr className="font-outfit">
                  <td className="border border-black w-full">
                    <select 
                      onChange={(e) => {
                        setCity(e.target.value);
                        setSearchHotel({...searchHotel, city: e.target.value});
                        localStorage.setItem("city", e.target.value);
                      }}
                      className="w-40 h-8 px-2 focus:outline-none"
                    >
                      <option value="">Pilih Kota</option>
                      <option value="Sibolga">Sibolga</option>
                      <option value="Pandan">Pandan</option>
                      <option value="Barus">Barus</option>
                      <option value="Pinang Sori">Pinang Sori</option>
                      <option value="Sidempuan">Sidempuan</option>
                    </select>
                  </td>
                  <td className="border border-black w-1/4">
                    <input
                      type="date"
                      required
                      value={searchHotel.checkIn}
                      onChange={(e) => {
                        const newCheckIn = e.target.value;
                        const today = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD

                        // Validasi jika check-in sebelum hari ini
                        if (newCheckIn < today) {
                          alert("Tanggal check-in tidak boleh sebelum hari ini.");
                          return;
                        }

                        setSearchHotel(prev => {
                          const newSearchHotel = { ...prev, checkIn: newCheckIn };
                          if (newSearchHotel.checkOut) {
                            const checkInDate = new Date(newSearchHotel.checkIn);
                            const checkOutDate = new Date(newSearchHotel.checkOut);

                            // Validasi jika check-out lebih awal atau sama dengan check-in
                            if (checkOutDate <= checkInDate) {
                              if (checkOutDate.getTime() === checkInDate.getTime()) {
                                alert("Tanggal check-in dan check-out tidak boleh sama.");
                              } else {
                                alert("Tanggal check-out tidak boleh lebih awal dari tanggal check-in.");
                              }
                              newSearchHotel.checkOut = ""; // Reset tanggal check-out jika tidak valid
                            } else {
                              const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
                              const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                              setNumberOfDays(differenceInDays);
                            }
                          }
                          return newSearchHotel;
                        });
                      }}
                      className="w-40 h-8 border-none focus:outline-none px-2"
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

                            // Validasi jika check-out lebih awal atau sama dengan check-in
                            if (checkOutDate <= checkInDate) {
                              if (checkOutDate.getTime() === checkInDate.getTime()) {
                                alert("Tanggal check-in dan check-out tidak boleh sama.");
                              } else {
                                alert("Tanggal check-out tidak boleh lebih awal dari tanggal check-in.");
                              }
                              newSearchHotel.checkOut = ""; // Reset tanggal check-out jika tidak valid
                            } else {
                              const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
                              const differenceInDays = differenceInTime / (1000 * 3600 * 24);
                              setNumberOfDays(differenceInDays);
                            }
                          }
                          return newSearchHotel;
                        });
                      }}
                      className="w-40 h-8 border-none focus:outline-none px-2"
                    />
                  </td>
                  <td className="border border-black w-1/4">
                    <input
                      type="number"
                      required
                      min={1}
                      max={4} // Set max 4 pada atribut HTML
                      value={searchHotel.numberOfGuest}
                      onChange={(e) => {
                      const value = parseInt(e.target.value) || 1; // Pastikan default 1 jika input kosong atau NaN

                        // Validasi agar nilai antara 1 dan 4
                        if (value < 1) {
                          alert("Jumlah tamu minimal adalah 1 orang.");
                          setSearchHotel({
                            ...searchHotel,
                            numberOfGuest: 1, // Set ke 1 jika nilai kurang dari 1
                            numberOfDays: numberOfDays
                          });
                        } else if (value > 4) {
                          alert("Jumlah tamu maksimal adalah 4 orang.");
                          setSearchHotel({
                            ...searchHotel,
                            numberOfGuest: 4, // Set ke 4 jika nilai lebih dari 4
                            numberOfDays: numberOfDays
                          });
                        } else {
                          setSearchHotel({
                            ...searchHotel,
                            numberOfGuest: value,
                            numberOfDays: numberOfDays
                          });
                        }
                      }}
                      className="w-32 h-8 border-none focus:outline-none px-2"
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
