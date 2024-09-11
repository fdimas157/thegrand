import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopUpProfile from "./PopUpProfile";

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

export default function Header({ setCity }: { setCity: React.Dispatch<React.SetStateAction<string>> }) {
  const [user, setUser] = useState<Partial<User>>({});
  const [popUpProfile, setPopUpProfile] = useState<boolean>(false);

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

  const cities = ["Jakarta", "Bandung", "Yogyakarta", "Surabaya", "Medan"];

  return (
    <header>
      <div className="flex flex-row justify-around p-4">
        <Link to="/">
          <h1 className="font-rowdies text-blue-600 text-4xl">
            ng<span className="text-yellow-400">IN</span>ep
          </h1>
        </Link>
        <div className="flex gap-4 justify-center items-center">
          <select
            name="city"
            id="city"
            className="font-bold p-2 w-32 focus:outline-none"
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {user?.firstName ? (
            <div className="flex items-center gap-4">
              <div className="font-rowdies">Selamat Datang {user.firstName || "Pengguna"}</div>
              <CircleUserRound
                className="text-white bg-blue-600 rounded-full cursor-pointer"
                size={40}
                onClick={() => setPopUpProfile(!popUpProfile)}
              />
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <Link
                to="/register"
                className="text-black border-2 border-black p-1 font-rowdies w-28 text-sm rounded-lg h-8 flex justify-center items-center"
              >
                Daftar
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 p-1 text-white font-rowdies w-28 text-sm rounded-lg h-8 flex justify-center items-center"
              >
                Masuk
              </Link>
            </div>
          )}
        </div>
        {popUpProfile && <PopUpProfile user={user} />}
      </div>
    </header>
  );
}
