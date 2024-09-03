// import React, { useEffect, useState } from 'react'
// import TagsInput from '../../../components/TagsInput';

// const Ingre = () => {
//   const [t2, setT2] = useState([]);
//   const suggestions = ['Python', 'Django', 'Flask', 'FastAPI'];
//   useEffect(()=>{console.log(t2);
//   },[t2])
//   return (
//     <div>
//       <h2>Test1 Component</h2>
//       <TagsInput suggestions={suggestions} tags={t2} setTags={setT2} />
//       <p>Stored Tags in t2: {t2.join(', ')}</p>
//     </div>
//   );
// }

// export default Ingre

import React, { useState, useEffect } from 'react';

const Ingre = () => {
    const [ingredients, setIngredients] = useState([
        { name: "Ingredient1", quantity: '10kg', supplier: 'Supplier1' },
        { name: "Ingredient2", quantity: '5kg', supplier: 'Supplier2' },
    ]);

    const [filterdData, setfilterdData] = useState(ingredients);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        supplier: '',
    });

    const handleSearching = () => {
        const lowercasedSearch = search.toLowerCase();
        const filtered = ingredients.filter((item) => 
            item.name.toLowerCase().includes(lowercasedSearch) ||
            item.supplier.toLowerCase().includes(lowercasedSearch)
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
        setIngredients([...ingredients, formData]);
        localStorage.setItem('ingredients', JSON.stringify([...ingredients, formData]));
        setFormData({ name: '', quantity: '', supplier: '' });
        handleCloseModal();
    };

    useEffect(() => {
        setfilterdData(ingredients);
       
    }, [ingredients]);

  useEffect(()=>{
    setIngredients(JSON.parse(localStorage.getItem('ingredients'))||[]);
  },[])
    return (
        <>
         <div className="col-span-12 lg:col-span-10  flex justify-center">
         <div className="flex flex-col gap-5 w-11/12">
            <div className='grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg'>
                <h2 className='col-span-12 flex justify-between align-baseline'>
                    <span className='my-auto'><i className="fa-solid fa-leaf"></i> Ingredients</span>
                    <div className="relative">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search ingredients..."
                                className="border rounded-md pl-10 pr-5 py-2"
                            />
                        </form>
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <span className='flex'>
                        <button onClick={handleOpenModal} className='bg-[#1570ef] text-white rounded-md px-3 py-2'>+ Add Ingredient</button>
                    </span>
                </h2>
                <div className='col-span-12'>
                    <div className='grid grid-cols-5 pb-3'>
                        <span>Ingredient's Name</span>
                        <span>Quantity</span>
                        <span>Supplier</span>
                    </div>
                    <hr />
                    {filterdData && filterdData.map((ingredient, i) => (
                        <div key={i} className='grid grid-cols-5 my-3'>
                            <span>{ingredient.name}</span>
                            <span>{ingredient.quantity}</span>
                            <span>{ingredient.supplier}</span>
                        </div>
                    ))}
                </div>
            </div>
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
                        <h2 className="text-xl font-semibold mb-4">Ingredient Information</h2>
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
                                <label className="block text-gray-700">Quantity:</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Supplier:</label>
                                <input
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
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

export default Ingre;
