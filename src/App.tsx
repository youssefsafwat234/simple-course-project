import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Button from './components/UI/Button'
import { formInputsList, productList } from './data'
import Modal from './components/UI/Modal'
import Input from './components/UI/Input'
import type { IProduct } from './interfaces'
import { productValidation } from './validations/productValidation'
import ErrorMessage from './components/UI/ErrorMessage'

function App() {
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // ================== STATE ================  
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState(defaultProduct)
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  })


  //  ================ Handlers ===============
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" }) 
  };

  const OnSbmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = productValidation(product);
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setErrors(errors);
      return;
    }
    
  }
  const onCancleHandler = () => {
    setProduct(defaultProduct);
    close();
  }
  // ================= Render ====================
  const fetchInputs = formInputsList.map((input) => {
    return (
      <div key={input.id} className='d-block flex flex-col space-y-1 mb-3'>
        <label htmlFor={input.id} className='text-sm font-medium text-gray-700'>{input.label}</label>
        <Input onChange={onChangeHandler} id={input.id} type={input.type} name={input.name} value={product[input.name]} className='border-2 border-gray-300 outline-0 p-2 shadow-sm focus:border-violet-700 transition-all rounded-md' />
        {errors[input.name] && <ErrorMessage message={errors[input.name]} />}
      </div>
    )
  });

  const fetchProducts = productList.map((product) => {
    return (
      <ProductCard key={product.id} product={product}/>
    )
  })


  return (
    <div className='lg:w-full'>
      <div className=' m-6 flex justify-between items-center '>
        <div className='text-2xl'>
          Latest <span className='text-violet-700 font-bold'>Products</span>
        </div>

        <Button width='w-fit' className="bg-violet-700 hover:bg-violet-800 capitalize" onClick={open}>Add New Product</Button>

      </div>
      <div className='m-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto'>
        {fetchProducts}
      </div>


      <Modal isOpen={isOpen} open={open} close={close} title='Add Product' >
        {fetchInputs}
        <div className="flex space-x-3 mt-5">
          <Button className="bg-violet-700 hover:bg-violet-800 capitalize!" onClick={OnSbmitHandler}>Submit</Button>
          <Button className="bg-red-500 hover:bg-red-700  capitalize!" onClick={onCancleHandler}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}

export default App
