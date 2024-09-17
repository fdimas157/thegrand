import { CalendarCog, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import PopUpProfile from "./PopUpProfile";
import { useEffect, useState } from "react";

export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    address?: string;
    email?: string;
    password?: string;
    phone?: string;
  }

export default function HeaderSearch() {
    const storedData = localStorage.getItem("searchHotel") || "{}";
    const { checkIn, checkOut, numberOfGuest } = JSON.parse(storedData);
    const city = localStorage.getItem("city");
    const [popUpProfile, setPopUpProfile] = useState<boolean>(false)
    const [user, setUser] = useState<Partial<User>>({});

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
                <CircleUserRound 
                    size={36} 
                    className="text-white cursor-pointer"
                    onClick={() => setPopUpProfile(!popUpProfile)}
                />
            </div>
        </div>
        {popUpProfile && (
            <PopUpProfile user={user}/>
        )}
    </header>
}