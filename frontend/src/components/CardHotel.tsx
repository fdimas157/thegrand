import { IoLocationSharp, IoStar } from "react-icons/io5";
import { Hotel } from "../pages/Search";
import { useNavigate } from "react-router-dom";

export default function CardHotel({ hotel }: { hotel: Hotel }) {
  const priceBefore = hotel.price * 1.25;
  const navigate = useNavigate();


  const renderStars = () => (
    [...Array(5)].map((_, i) => (
      <IoStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-400"} />
    ))
  );

  const amenities = [
    "Kolam Renang",
    "Parkir Luas",
    "Pusat Kebugaran",
    "Area Main Anak",
    "Bar",
    "Akses Mudah Bagi Penyandang Disabilitas",
  ];

  return (
    <div className="cursor-pointer bg-gray-100 w-full h-auto rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-100 flex flex-row p-2 gap-4">
      <img src={hotel.picture} alt={hotel.name} className="w-1/3 rounded-lg" />
      <div className="flex flex-col w-1/3 gap-1">
        <div className="font-rowdies text-2xl">{hotel.name}</div>
        <div className="flex items-center">
          <div className="font-noto text-xs mr-2 text-blue-600 font-bold">{hotel.type}</div>
          {renderStars()}
        </div>
        <div className="flex items-center gap-2 font-outfit">
          <IoLocationSharp size={20} />
          <div>{`${hotel.address}, ${hotel.city}`}</div>
        </div>
        <div className="flex flex-wrap gap-2 font-outfit text-xs p-2">
          {amenities.map((item) => (
            <div key={item} className="bg-gray-200 rounded p-1">{item}</div>
          ))}
        </div>
      </div>
      <div className="w-1/3 flex font-rowdies flex-col justify-end items-end p-4">
        <div className="text-sm text-green-600 pb-4">25% OFF</div>
        <div className="line-through text-gray-400 text-sm">Rp. {priceBefore.toLocaleString('id-ID')}</div>
        <div className="text-3xl text-orange-500">Rp. {hotel.price.toLocaleString('id-ID')}</div>
        <div className="font-outfit text-xs pb-4">Sudah termasuk pajak & biaya</div>
        <button
          onClick={() => {
            localStorage.setItem('hotel', JSON.stringify(hotel.id));
            navigate("/booking");
          }}
          className="bg-orange-500 hover:bg-orange-600 h-10 w-7/12 rounded-xl text-xs text-white">Booking Sekarang</button>
      </div>
    </div>
  );
}
