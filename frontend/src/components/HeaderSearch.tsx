import { CalendarCog, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderSearch() {
    const storedData = localStorage.getItem("searchHotel") || "{}";
    const { checkIn, checkOut, city, numberOfGuest } = JSON.parse(storedData);


    return <header className="">
        <div className="flex flex-row justify-around p-4 bg-blue-600 w-full h-16 items-center">
            <Link to={"/"}>
                <h1 className="font-rowdies text-white text-4xl">
                ng<span className="text-yellow-400">IN</span>ep
                </h1>
            </Link>
            <div className="flex items-center flex-row gap-4">
                <div className="text-white font-rowdies text-xs flex gap-2 flex-row items-center">
                    <div>Chek-In : </div>
                    <div className="">{checkIn}</div>
                    <CalendarCog size={16} className="cursor-pointer"/>
                </div>
                <div className="text-white font-rowdies text-xs flex gap-2 flex-row items-center">
                    <div>Chek-out : </div>
                    <div className="">{checkOut}</div>
                    <CalendarCog size={16} className="cursor-pointer"/>
                </div>
                <div className="font-rowdies text-xs text-white">Untuk : {numberOfGuest} Orang</div>
                <div className="font-rowdies text-xs text-white">Di : Kota {city}</div>
            </div>
            <div className="flex flex-row items-center gap-2">
                <div className="font-rowdies text-white">PROFIL</div>
                <CircleUserRound size={36} className="text-white"/>
            </div>
        </div>
    </header>
}