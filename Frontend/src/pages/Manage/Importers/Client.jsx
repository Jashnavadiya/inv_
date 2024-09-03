// import React, { useEffect, useState } from 'react'
// import TagsInput from '../../../components/TagsInput';

// const Client = () => {
//   const [t1, setT1] = useState([]);
//   const suggestions = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js'];

//   useEffect(()=>{console.log(t1);
//   },[t1])
//   return (
//     <div>
//       <h2>Test Component</h2>
//       <TagsInput suggestions={suggestions} tags={t1} setTags={setT1} />
//       <p>Stored Tags in t1: {t1.join(', ')}</p>
//     </div>
//   );
// }

// export default Client

import React, { useState, useEffect } from 'react';

const Client = () => {
    const [clients, setClients] = useState([
        { name: "Client1", contact: '1234567890', email: 'client1@example.com' },
        { name: "Client2", contact: '1234567891', email: 'client2@example.com' },
    ]);

    const [filterdData, setfilterdData] = useState(clients);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
    });

    const handleSearching = () => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = clients.filter((item) =>
            item.name.toLowerCase().includes(lowercasedSearch) ||
            item.email.toLowerCase().includes(lowercasedSearch) ||
            item.contact.toLowerCase().includes(lowercasedSearch)
        );
        setfilterdData(filtered);
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
        setClients([...clients, formData]);
        setFormData({ name: '', contact: '', email: '' });
        handleCloseModal();
    };

    useEffect(() => {
        setfilterdData(clients);
    }, [clients]);

    return (
        <>
        <div className="col-span-12 lg:col-span-10  flex justify-center">
        <div className="flex flex-col gap-5 w-11/12">
            <div className='grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg'>
                <h2 className='col-span-12 flex justify-between align-baseline'>
                    <span><i className="fa-solid fa-user"></i> Clients</span>
                    <div className="relative">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search clients..."
                                className="border rounded-md pl-10 pr-5 py-2"
                            />
                        </form>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <span className='flex'>
                        <button onClick={handleOpenModal} className='bg-[#1570ef] text-white rounded-md px-3 py-2'>+ Add Client</button>
                    </span>
                </h2>
                <div className='col-span-12'>
                    <div className='grid grid-cols-5 pb-3'>
                        <span>Client's Name</span>
                        <span>Contact</span>
                        <span>Email</span>
                    </div>
                    <hr />
                    {filterdData && filterdData.map((client, i) => (
                        <div key={i} className='grid grid-cols-5 my-3'>
                            <span>{client.name}</span>
                            <span>{client.contact}</span>
                            <span>{client.email}</span>
                        </div>
                    ))}
                </div>
            </div>
</div></div>
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
                        <h2 className="text-xl font-semibold mb-4">Client Information</h2>
                        <form onSubmit={handleSubmit}>
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
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Client;
