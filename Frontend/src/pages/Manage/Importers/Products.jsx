import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([
    { name: "Product 1", code: 'A1122334455', price: '$20', category: 'Electronics' },
    { name: "Product 2", code: 'B11223344556', price: '$25', category: 'Books' },
    { name: "Product 3", code: 'C11223344557', price: '$30', category: 'Clothing' },
    { name: "Product 4", code: 'D11223344558', price: '$20', category: 'Toys' },
    { name: "Product 5", code: 'E11223344559', price: '$15', category: 'Kitchen' }
  ]);

  const [filteredData, setFilteredData] = useState(products);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    code: '',
    category: '',
  });

  const handleSearching = () => {
    const lowercasedSearch = search.toLowerCase();

    const highlightedData = products.map((item) => {
      const nameHighlighted = item.name.replace(
        new RegExp(`(${lowercasedSearch})`, 'gi'),
        (match) => `<span class="bg-blue-200">${match}</span>`
      );
      const codeHighlighted = item.code.replace(
        new RegExp(`(${lowercasedSearch})`, 'gi'),
        (match) => `<span class="bg-blue-200">${match}</span>`
      );
      const priceHighlighted = item.price.replace(
        new RegExp(`(${lowercasedSearch})`, 'gi'),
        (match) => `<span class="bg-blue-200">${match}</span>`
      );

      return {
        ...item,
        nameHighlighted,
        codeHighlighted,
        priceHighlighted,
      };
    });

    const filtered = highlightedData.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedSearch) ||
        item.code.toLowerCase().includes(lowercasedSearch) ||
        item.price.toLowerCase().includes(lowercasedSearch)
    );

    setFilteredData(filtered);
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
    setProducts([...products, formData]);
    setFormData({ name: '', price: '', category: '' ,code: '' });
    handleCloseModal();
  };

  useEffect(() => {
    setFilteredData(products);
    handleSearching()
  }, [products]);

  return (
    <>
      <div className='grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg'>
        <h2 className='col-span-12 flex justify-between align-baseline'>
          <span><i className="fa-solid fa-box"></i> Products</span>
          <div className="relative">
            <form action="" onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="border rounded-md pl-10 pr-5 py-2"
              />
            </form>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <span className='flex'>
            <button onClick={handleOpenModal} className='bg-[#1570ef] text-white rounded-md px-3 py-2'>+ Add Product</button>
          </span>
        </h2>
        <div className='col-span-12'>
          <div className='grid grid-cols-5 pb-3'>
            <span>Product's Name</span>
            <span>Price</span>
            <span>Category</span>
          </div>
          <hr />
          {filteredData.map((product, i) => (
            <div key={i} className='grid grid-cols-4 my-3'>
              <span dangerouslySetInnerHTML={{ __html: product.nameHighlighted }}></span>
              <span dangerouslySetInnerHTML={{ __html: product.codeHighlighted }}></span>
              <span dangerouslySetInnerHTML={{ __html: product.priceHighlighted }}></span>
              <span>{product.category}</span>
            </div>
          ))}

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
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
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
                <label className="block text-gray-700">Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">code:</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
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

export default Products;

// import React, { useState, useEffect } from 'react';

// const Products = () => {
//     const [products, setProducts] = useState([
//         { name: "Product 1", code: 'A1122334455', price: '$20', category: 'Electronics' },
//         { name: "Product 2", code: 'B11223344556', price: '$25', category: 'Books' },
//         { name: "Product 3", code: 'C11223344557', price: '$30', category: 'Clothing' },
//         { name: "Product 4", code: 'D11223344558', price: '$20', category: 'Toys' },
//         { name: "Product 5", code: 'E11223344559', price: '$15', category: 'Kitchen' }
//     ]);

//     const [filteredData, setFilteredData] = useState(products);
//     const [search, setSearch] = useState('');

//     const handleSearching = () => {
//         const lowercasedSearch = search.toLowerCase();
//         const highlightedData = products.map((item) => {
//             const nameHighlighted = item.name.replace(
//                 new RegExp(`(${lowercasedSearch})`, 'gi'),
//                 (match) => `<span class="bg-blue-200">${match}</span>`
//             );
//             const codeHighlighted = item.code.replace(
//                 new RegExp(`(${lowercasedSearch})`, 'gi'),
//                 (match) => `<span class="bg-blue-200">${match}</span>`
//             );
//             const priceHighlighted = item.price.replace(
//                 new RegExp(`(${lowercasedSearch})`, 'gi'),
//                 (match) => `<span class="bg-blue-200">${match}</span>`
//             );

//             return {
//                 ...item,
//                 nameHighlighted,
//                 codeHighlighted,
//                 priceHighlighted,
//             };
//         });

//         const filtered = highlightedData.filter(
//             (item) =>
//                 item.name.toLowerCase().includes(lowercasedSearch) ||
//                 item.code.toLowerCase().includes(lowercasedSearch) ||
//                 item.price.toLowerCase().includes(lowercasedSearch)
//         );

//         setFilteredData(filtered);
//     };

//     useEffect(() => {
//         handleSearching();
//     }, [search]);

//     return (
//         <>
//             <div className='grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4 p-4 bg-white rounded-lg'>
//                 <h2 className='col-span-12 flex justify-between align-baseline'>
//                     <span><i className="fa-solid fa-box"></i> Products</span>
//                     <div className="relative">
//                         <form action="" onSubmit={(e) => e.preventDefault()}>
//                             <input
//                                 type="search"
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 placeholder="Search something..."
//                                 className="border rounded-md pl-10 pr-5 py-2"
//                             />
//                         </form>
//                         <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                             <i className="fas fa-search"></i>
//                         </span>
//                     </div>
//                 </h2>
//                 <div className='col-span-12'>
//                     <div className='grid grid-cols-4 pb-3'>
//                         <span>Name</span>
//                         <span>Code</span>
//                         <span>Price</span>
//                         <span>Category</span>
//                     </div>
//                     <hr />
//                     {filteredData.map((product, i) => (
//                         <div key={i} className='grid grid-cols-4 my-3'>
//                             <span dangerouslySetInnerHTML={{ __html: product.nameHighlighted }}></span>
//                             <span dangerouslySetInnerHTML={{ __html: product.codeHighlighted }}></span>
//                             <span dangerouslySetInnerHTML={{ __html: product.priceHighlighted }}></span>
//                             <span>{product.category}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Products;
