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
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]); // State untuk hotel yang sudah difilter
    const [, setSelectedPriceRange] = useState<number[]>([]); // State untuk menyimpan kisaran harga yang dipilih
    const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]); // State untuk tipe akomodasi yang dipilih
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage: number = 8;
    const indexOfLastItem: number = currentPage * itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
    const currentHotels: Hotel[] = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);


    useEffect(() => {
        fetch("http://localhost:8084/api/hotel/bycity/" + localStorage.getItem("city"))
            .then((response) => response.json())
            .then((data) => {
                setHotel(data);
                setFilteredHotels(data); // Atur data awal untuk filteredHotels
            });
    }, []);

    const handlePriceFilter = (priceRange: number[]) => {
        setSelectedPriceRange(priceRange);

        // Filter hotel berdasarkan kisaran harga yang dipilih
        const filtered = hotel.filter(h =>
            (priceRange.length === 0) || (h.price >= priceRange[0] && h.price <= priceRange[1])
        );
        setFilteredHotels(filtered);
        setCurrentPage(1); // Reset halaman ke 1 setelah filter diterapkan
    };

    // Fungsi untuk menangani perubahan tipe akomodasi
    const handleAccommodationChange = (type: string) => {
        if (selectedAccommodations.includes(type)) {
            setSelectedAccommodations(selectedAccommodations.filter(item => item !== type)); // Hapus jika sudah dipilih
        } else {
            setSelectedAccommodations([...selectedAccommodations, type]); // Tambah tipe baru
        }
    };

    const applyFilters = () => {
        let filtered = hotel;

        // Filter berdasarkan tipe akomodasi jika ada yang dipilih
        if (selectedAccommodations.length > 0) {
            filtered = filtered.filter(h => selectedAccommodations.includes(h.type));
        }

        setFilteredHotels(filtered);
        setCurrentPage(1); // Reset halaman ke 1 setelah filter diterapkan
    };
    
    return (
        <>
            <HeaderSearch/>
            <div className="flex flex-row">
                <div className="w-1/4 h-auto flex flex-col">
                    <div className="text-center font-rowdies pt-8 text-xl">Filter Populer untuk {localStorage.getItem("city")}</div>
                    <div className="text-sm font-rowdies pl-8 pt-4">Kisaran Harga</div>
                    <div className="p-4">
                    <form className="flex flex-col gap-3">
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([100000, 200000])}
                                />
                                Rp. 100.000 - Rp. 200.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([200000, 500000])}
                                />
                                Rp. 200.000 - Rp. 500.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([500000, 1000000])}
                                />
                                Rp. 500.000 - Rp. 1.000.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([1000000, 2000000])}
                                />
                                Rp. 1.000.000 - Rp. 2.000.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([2000000, 5000000])}
                                />
                                Rp. 2.000.000 - Rp. 5.000.000
                            </label>
                            <label htmlFor="" className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="radio"
                                    name="price"
                                    className="w-4 h-4"
                                    onChange={() => handlePriceFilter([])} // Tidak ada filter jika tidak ada kisaran harga
                                />
                                Semua Harga
                            </label>
                        </form>
                    </div>
                    <div className="text-sm font-rowdies pl-8 pt-4">Tipe Akomodasi</div>
                    <div className="p-4">
                        <form action="" className="flex flex-col gap-3">
                            <label className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleAccommodationChange("Hotel")}
                                    checked={selectedAccommodations.includes("Hotel")}
                                />
                                Hotel
                            </label>
                            <label className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleAccommodationChange("Apartemen")}
                                    checked={selectedAccommodations.includes("Apartemen")}
                                />
                                Apartemen
                            </label>
                            <label className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleAccommodationChange("Vila")}
                                    checked={selectedAccommodations.includes("Vila")}
                                />
                                Vila
                            </label>
                            <label className="flex flex-row items-center font-rowdies text-xs gap-2 pl-4">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    onChange={() => handleAccommodationChange("Guest House")}
                                    checked={selectedAccommodations.includes("Guest House")}
                                />
                                Guest House
                            </label>
                            <button
                                type="button"
                                className="font-rowdies bg-blue-600 text-white rounded h-6 text-sm"
                                onClick={applyFilters}
                            >
                                Perbarui
                            </button>
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