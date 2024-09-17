import { CircleUserRound } from "lucide-react"
import { useNavigate } from "react-router-dom";

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    address?: string;
    email?: string;
    password?: string;
    phone?: string;
}
export default function PopUpProfile({user} : {
    user: User,
}){
    const navigate = useNavigate();

    return <div className="h-72 w-56 bg-white absolute right-20 border-2 border-blue-600 rounded-xl top-16 flex gap-2 flex-col justify-center items-center p-4">
        <div className="font-rowdies text-center text-lg">{user.firstName} {user.lastName}</div>
        <CircleUserRound size={80}/>
        <div className="font-outfit text-xs">{user.email}</div>
        <button className="font-rowdies h-8 bg-blue-600 text-white w-3/4 text-xs rounded-lg">Lihat Profil</button>
        <button 
            onClick={() => {
                localStorage.clear();
                navigate("/login");
            }} 
            className="font-rowdies h-8 text-blue-600 text-xs rounded-lg underline"
        >
            Keluar
        </button>
    </div>
}