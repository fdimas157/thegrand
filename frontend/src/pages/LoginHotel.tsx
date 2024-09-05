import { Link } from "react-router-dom"

export default function LoginHotel(){
    return (
    <div>                
        <img src="/src/assets/other/Picture1.jpg" alt="" className="absolute object-cover object-top w-full h-full max-w-full max-h-full -z-10"/>
            <div className="h-screen w-full flex justify-end items-center flex-row gap-4 px-12">
                <div className=" w-full p-4 text-white text-4xl h-5/6 flex justify-end flex-col gap-2 pb-16">
                    <div className="font-outfit font-bold">
                        Nikmati keindahan dalam kesederhanaan, sebuah pengalaman menginap yang menginspirasi
                    </div>
                    <div className="font-outfit text-sm text-black font-bold">Dapatkan promo menarik dan berbagai keseruan lainnya</div>
                </div>
                <div className="bg-white h-5/6 w-3/6 rounded-xl shadow-xl flex flex-col items-center p-4">
                    <img src="/src/assets/other/log.png" alt="" className="w-3/5"/>
                    <div className="font-outfit text-center text-lg px-8 -mt-8" >
                        Selamat datang di aplikasi booking hotel No. 1 di Indonesia
                    </div>
                    <form action="" className="p-4 flex flex-col w-full items-center font-outfit gap-4">
                        <input type="email" className="border-2 border-black h-10 w-3/4 rounded-lg px-2" placeholder="Masukan email"/>
                        <input type="password" className="border-2 border-black h-10 w-3/4 rounded-lg px-2" placeholder="Masukan password"/>
                        <input 
                            type="submit" 
                            value={"Masuk"}
                            className="bg-blue-600 text-white w-2/5 h-10 rounded-lg font-bold cursor-pointer hover:bg-blue-700"
                        />
                        <div className="flex flex-row text-sm gap-2">
                            <div>
                                Belum punya akun?
                            </div>
                            <Link to={"/register"} className="font-bold text-orange-500 cursor-pointer hover:underline">Daftar</Link>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    )
}