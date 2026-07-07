import React, { useContext, useState } from 'react';
import { ProductContext } from '../Contex/ProductContex';

const AddProduct = () => {
  let { setselectimage } = useContext(ProductContext);
  const [Title, setTitle] = useState('');
  const [Price, setPrice] = useState('');
  const [Brand, setBrand] = useState('');
  const [Material, setMaterial] = useState('');
  const [FitType, setFitType] = useState('');
  const [Itemweight, setItemweight] = useState('');
  const [Colour, setColour] = useState('');
  const [Description, setDescription] = useState('');
  const [Base64, setBase64] = useState("");
  const [previewImage, setpreviewImage] = useState(null);
  const [categories, setCategories] = useState('Shirt');

  const handler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setpreviewImage(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UploadProduct = () => {
    if (!Title.trim()) {
      alert("Kripya Product ka Title dalein!");
      return;
    }
    if (!Price.trim()) {
      alert("Kripya Product ki Price dalein!");
      return;
    }
    if (!Base64) {
      alert("Kripya Product ki ek Image select karein!");
      return;
    }

    const SaveProduct = {
      Title,
      Price,
      Brand,
      Material,
      FitType,
      Itemweight,
      color: Colour,
      Description,
      image: Base64,
      category: categories,
      Date:Date().toLocaleString()
    };
    
    setselectimage((prev) => [...prev, SaveProduct]);

    // Reset Form
    setTitle('');
    setPrice('');
    setBrand('');
    setMaterial('');
    setFitType('');
    setItemweight('');
    setColour('');
    setDescription('');
    setBase64('');
    setpreviewImage(null);
    setCategories('Shirt');
  };

  return (
    <div className='flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto items-start justify-center'>
      
      {/* Left Section: Image, Inputs, and Dropdown */}
      <div className='flex flex-col w-full md:w-1/2 border-pink-900 md:border-2 justify-center items-center gap-4 p-4 rounded-lg shadow-sm'>
        
        <div className='flex flex-col gap-3 w-full max-w-md'>
          <input
            type="file"
            className='bg-[#27088b] text-[#fdffff] px-3 py-2 rounded underline text-sm md:text-base cursor-pointer'
            accept='image/*'
            onChange={handler}
          />
          {previewImage && (
            <img 
              src={previewImage} 
              alt='Preview' 
              className='w-full max-h-64 object-contain rounded border border-gray-200' 
            />
          )}
          <input
            className='px-3 py-2 border-2 rounded text-base outline-none focus:border-blue-500 transition-all'
            type="text"
            placeholder='Title'
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Product Details Table-like layout for responsiveness */}
        <div className='ProductDetails flex flex-col gap-3 w-full max-w-md py-4 h-fit bg-[#81b0d4] px-4 rounded-md'>
          
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Brand :</label>
            <input
              type="text"
              placeholder='Brand Name'
              value={Brand}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Price :</label>
            <input
              type="text"
              placeholder='Price'
              value={Price}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Material :</label>
            <input
              type="text"
              placeholder='Material'
              value={Material}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setMaterial(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Fit type :</label>
            <input
              type="text"
              placeholder='Fit type'
              value={FitType}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setFitType(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Weight :</label>
            <input
              type="text"
              placeholder='Item Weight'
              value={Itemweight}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setItemweight(e.target.value)}
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Category :</label>
            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className='bg-white text-black border border-gray-300 w-full sm:w-64 rounded px-2 py-1 text-base cursor-pointer outline-none'
            >
              <option value="Shirt">Shirt</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Combo">Combo</option>
            </select>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2'>
            <label className='font-medium text-gray-800 text-base sm:text-lg'>Colour :</label>
            <input
              type="text"
              placeholder='Colour'
              value={Colour}
              className='px-2 py-1 rounded border w-full sm:w-64 text-black text-base'
              onChange={(e) => setColour(e.target.value)}
            />
          </div>
        </div>

        <button
          className='w-full max-w-md py-2.5 rounded bg-[#b40e19] hover:bg-[#960b14] active:scale-95 text-[#fdffff] font-semibold transition-all shadow-md'
          onClick={UploadProduct}
        >
          Upload Product
        </button>
      </div>

      {/* Right Section: Description */}
      <div className='flex flex-col gap-3 w-full md:w-1/2 p-4 bg-pink-900 text-amber-50 rounded-lg shadow-sm self-stretch'>
        <label className='font-bold text-2xl md:text-3xl'>Description</label>
        <textarea
          className='border-amber-50 p-2 min-h-[150px]] text-wrap resize-y border-2 rounded bg-transparent text-amber-50 placeholder-amber-200/60 outline-none focus:border-white'
          placeholder='Write product description here...'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

    </div>
  );
};

export default AddProduct;