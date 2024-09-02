import React, { useState, useEffect } from 'react';
import TagsInput from '../../../components/TagsInput';

const Importer = () => {
    const [supplier, setSupplier] = useState([
        { name: "saputara", contact: '1122334455', email: 'saputara123@gmail.com' },
        { name: "saputara1", contact: '11223344556', email: 'saputara123@gmail.com' },
        { name: "saputara2", contact: '11223344557', email: 'saputara122233@gmail.com' },
        { name: "saputara3", contact: '11223344558', email: 'saputara123@gmail.com' },
        { name: "saputara4", contact: '11223344558', email: 'saputara123@gmail.com' },
        { name: "saputara5", contact: '11223344559', email: 'saputara123@gmail.com' }
    ]);

    const [t1, setT1] = useState([]);
    const suggestions = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Express', 'MongoDB'];
    const [filterdData, setfilterdData] = useState(supplier);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        city: '',
        image: ''
    });

    const handleSearching = () => {
        const lowercasedSearch = search.toLowerCase();
        const helios = supplier.filter((item) => 
            item.name.toLowerCase().includes(lowercasedSearch) ||
            item.email.toLowerCase().includes(lowercasedSearch) ||
            item.contact.toLowerCase().includes(lowercasedSearch)
        );
        setfilterdData(helios);
    };

    useEffect(() => {
        handleSearching();
    }, [search]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add the new supplier to the state
        setSupplier([...supplier, formData]);

        // Clear the form
        setFormData({
            name: '',
            contact: '',
            email: '',
            city: '',
            image: ''
        });

        // Close the modal
        handleCloseModal();
    };

    useEffect(()=>{
        setfilterdData(supplier)
    },[supplier])
    return (
        <>
            <div className='grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg'>
                <h2 className='col-span-12 flex justify-between align-baseline'>
                    <span><i className="fa-solid fa-user"></i> Suppliers</span>
                    <div className="relative">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search something..."
                                className="border rounded-md pl-10 pr-5 py-2"
                            />
                        </form>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <span className='flex'>
                        <button onClick={handleOpenModal} className='bg-[#1570ef] text-white rounded-md px-3 py-2'>+ Add Supplier</button>
                        <button className='rounded-md px-3 py-2 flex align-middle'>
                            <img className='my-auto mx-2' src="/filter-icon.png" alt="Filter" />
                            <span>filters</span>
                        </button>
                    </span>
                </h2>
                <div className='col-span-12'>
                    <div className='grid grid-cols-5 pb-3'>
                        <span>supplier's name</span>
                        <span>Contact</span>
                        <span>Email</span>
                        <span>Email</span>
                        <span>Email</span>
                    </div>
                    <hr />
                    {filterdData && filterdData.map((ele, i) => (
                        <div key={i} className='grid grid-cols-5 my-3'>
                            <span>{ele.name}</span>
                            <span>{ele.contact}</span>
                            <span>{ele.email}</span>
                            <span>Email</span>
                            <span>Email</span>
                        </div>
                    ))}
                </div>
                <div>
                    <TagsInput suggestions={suggestions} tags={t1} setTags={setT1} />
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleCloseModal}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Supplier Information</h2>
                        
                            <div className="mb-4">
                                <label className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Contact:</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image URL:</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default Importer;
