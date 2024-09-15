import { useEffect, useState } from "react";
import CardHotel from "../components/CardHotel";
import HeaderSearch from "../components/HeaderSearch";
import Footer from "../components/Footer";

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

export default function Search(){
    const [hotel, setHotel] = useState<Hotel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 8;
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentHotels: Hotel[] = hotel.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch("http://localhost:8084/api/hotel")
            .then((response) => response.json())
            .then((data) => setHotel(data));
    }, [])

    
    return (
        <>
            <HeaderSearch/>
            <div className="flex flex-row">
                <div className="w-1/4 h-auto flex flex-col">
                    <div className="text-center font-rowdies pt-8 text-xl">Filter Populer untuk Jakarta</div>
                    <div className="text-sm font-rowdies pl-8 pt-4">Fasilitas</div>
                    <div className="p-4">
                        <form action="" className="flex flex-col gap-3">
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Kamar Mandi Dalam
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Kolam Renang
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                AC
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Free WiFi
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Hewan peliharaan diizinkan
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Parkir
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Repsesionis 24 Jam
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Balkon
                            </label>
                            <button className="font-rowdies bg-blue-600 text-white rounded h-6 text-sm">Perbarui</button>
                        </form>
                    </div>
                    <div className="text-sm font-rowdies pl-8 pt-4">Kisaran Harga</div>
                    <div className="p-4">
                        <form action="" className="flex flex-col gap-3">
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Rp. 100.000 - Rp. 200.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Rp. 200.000 - Rp. 500.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Rp. 500.000 - Rp. 1.000.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Rp. 1.000.000 - Rp. 2.000.000
                            </label>
                            <button className="font-rowdies bg-blue-600 text-white rounded h-6 text-sm">Perbarui</button>
                        </form>
                    </div>
                    <div className="text-sm font-rowdies pl-8 pt-4">Tipe Akomodasi</div>
                    <div className="p-4">
                        <form action="" className="flex flex-col gap-3">
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Hotel
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Apartemen
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Vila
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input type="checkbox" className="w-4 h-4"/>
                                Guest House
                            </label>
                            <button className="font-rowdies bg-blue-600 text-white rounded h-6 text-sm">Perbarui</button>
                        </form>
                    </div>
                </div>
                <div className="w-3/4 h-auto p-4 font-rowdies text-xs">
                    {currentHotels.map((h) => (    
                        <CardHotel hotel={h} key={h.id}/>
                    ))}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(hotel.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white w-8' : 'bg-gray-300 text-black w-8'} rounded hover:bg-gray-400`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(hotel.length / itemsPerPage)}
                            className="p-2 mx-1 bg-gray-300 text-black rounded hover:bg-gray-400 w-24"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}