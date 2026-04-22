import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Button from './components/UI/Button'
import { categories, colors, formInputsList, productList } from './data'
import Modal from './components/UI/Modal'
import Input from './components/UI/Input'
import type { ICategory, IProduct } from './interfaces'
import { productValidation } from './validations/productValidation'
import ErrorMessage from './components/UI/ErrorMessage'
import ColorCircle from './components/UI/ColorCircle'
import Select from './components/UI/Select'
import { v4 as uuid } from "uuid";
import Toastr from './components/UI/Toastr'
const defaultCategory: ICategory = {
  name: "",
  imageURL: "",
}
function App() {
  const defaultProduct: IProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: defaultCategory,
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
  const [products, setProducts] = useState(productList as IProduct[]);
  const [tempCategory, setTempCategory] = useState(defaultCategory as ICategory);
  const [tempColors, setTempColors] = useState<string[]>([])
  const defaultColors = colors.map((color) => {
    const borderColor = tempColors.includes(color) ? "border-gray-300" : "border-violet-700";
    return <ColorCircle key={color} color={color} borderColor={borderColor} onClick={() => setTempColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])} />
  });
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(defaultProduct)
  const [tempEditColors, setTempEditColors] = useState<string[]>([])
  const [tempEditCategory, setTempEditCategory] = useState(defaultCategory as ICategory);

  const defaultEditColors = colors.map((color) => {
    const borderColor = tempEditColors.includes(color) ? "border-gray-300" : "border-violet-700";
    return <ColorCircle key={color} color={color} borderColor={borderColor} onClick={() => setTempEditColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])} />
  });

  const [isDeleteModalOpen, setIsDeleteModal] = useState(false);
  const [deletedProduct, setDeleteProduct] = useState(defaultProduct)

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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


  const OnSbmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const errors = productValidation(product);
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setErrors(errors);
      return;
    }
    const finalProduct: IProduct = { ...product, colors: tempColors, id: uuid(), category: tempCategory };
    setProducts(prev => [...prev, finalProduct]);
    setProduct(defaultProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setTempCategory({
      name: "",
      imageURL: "",
    });
    setTempColors([]);
    setShowCreateAlert(true);
    close();
  }
  const onCancleHandler = () => {
    setProduct(defaultProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    close();
  }

  const onClickEditHandler = (product: IProduct) => {
    setEditProduct(product);
    openEditModal();
    setTempEditColors(product.colors);
    setTempEditCategory(product.category);
  }
  const onEditChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
    setErrors({ ...errors, [name]: "" })
  };

  const onEditSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(editProduct)
    // const errors = productValidation(editProduct);
    // const hasErrors = Object.values(errors).some((error) => error !== "");
    // if (hasErrors) {
    //   setErrors(errors);
    //   return;
    // }
    const finalProduct: IProduct = { ...editProduct, colors: tempEditColors, id: uuid(), category: tempEditCategory };
    const targetIndex = products.findIndex(
      prod => prod.id === editProduct.id
    );
    const updatedProducts = [...products];
    updatedProducts[targetIndex] = finalProduct;
    setProducts(updatedProducts);
    setEditProduct(defaultProduct);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setTempEditCategory(defaultCategory);
    setTempEditColors([]);
    setShowEditAlert(true);
    closeEditModal();
  }


  const onClickEditCancelHandler = () => {
    setEditProduct(defaultProduct);
    setTempEditColors([]);
    setTempEditCategory(defaultCategory);
    closeEditModal();
  }



  function openEditModal() {
    setIsEditOpen(true)
  }
  function closeEditModal() {
    setIsEditOpen(false)
  }

  function openDeleteModal() {
    setIsDeleteModal(true);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }

  const onClickDeleteHandler = (product: IProduct) => {
    setDeleteProduct(product);
    openDeleteModal();
  }

  const onDeleteSubmitHandler = () => {
    const targetIndex = products.findIndex(
      prod => prod.id === deletedProduct.id
    );
    const updatedProducts = [...products];
    updatedProducts.splice(targetIndex, 1);
    setProducts(updatedProducts);
    setShowDeleteAlert(true);
    closeDeleteModal();
  }

  const onClickDeleteCancelHandler = () => {
    setDeleteProduct(defaultProduct);
    closeDeleteModal();
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


  const fetchEditInputs = formInputsList.map((input) => {
    return (
      <div key={input.id} className='d-block flex flex-col space-y-1 mb-3'>
        <label htmlFor={input.id} className='text-sm font-medium text-gray-700'>{input.label}</label>
        <Input onChange={onEditChangeHandler} id={input.id} type={input.type} name={input.name} value={editProduct[input.name]} className='border-2 border-gray-300 outline-0 p-2 shadow-sm focus:border-violet-700 transition-all rounded-md' />
        {errors[input.name] && <ErrorMessage message={errors[input.name]} />}
      </div>
    )
  });

  const fetchProducts = products.map((product) => {
    return (
      <ProductCard key={product.id} product={product} onClickEditHandler={onClickEditHandler} onClickDeleteHandler={onClickDeleteHandler} />
    )
  })

  return (
    <>
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
          <div className="flex  mt-3 mb-3 flex-wrap  gap-2.5">
            {tempColors.map((color, index) => {
              return <div key={index} className="cursor-pointer text-white p-1.5 rounded" style={{ backgroundColor: color }}
                onClick={() => setTempColors(prev => prev.filter(c => c !== color))}
              >{color}</div>
            })}
          </div>
          <div className="flex space-x-2 mt-3 mb-3 flex-wrap space-y-2">
            {defaultColors}
          </div>
          <Select defaultValue="Select Category" onChange={(e) => setTempCategory({ name: e.target.value, imageURL: categories.find(c => c.name === e.target.value)?.imageURL })} />
          <div className="flex space-x-3 mt-5">
            <Button className="bg-violet-700 hover:bg-violet-800 capitalize!" onClick={OnSbmitHandler}>Submit</Button>
            <Button className="bg-red-500 hover:bg-red-700  capitalize!" onClick={onCancleHandler}>Cancel</Button>
          </div>
        </Modal>


        <Modal isOpen={isEditOpen} open={openEditModal} close={closeEditModal} title='Edit Product' >
          {fetchEditInputs}
          <div className="flex  mt-3 mb-3 flex-wrap  gap-2.5">
            {tempEditColors.map((color, index) => {
              return <div key={index} className="cursor-pointer text-white p-1.5 rounded" style={{ backgroundColor: color }}
                onClick={() => setTempEditColors(prev => prev.filter(c => c !== color))}
              >{color}</div>
            })}
          </div>
          <div className="flex space-x-2 mt-3 mb-3 flex-wrap space-y-2">
            {defaultEditColors}
          </div>
          <Select defaultValue={tempEditCategory.name} onChange={(e) => setTempEditCategory({ name: e.target.value, imageURL: categories.find(c => c.name === e.target.value)?.imageURL })} />

          <div className="flex space-x-3 mt-5">
            <Button className="bg-violet-700 hover:bg-violet-800 capitalize!" onClick={(event) => onEditSubmitHandler(event)}>Submit</Button>
            <Button className="bg-red-500 hover:bg-red-700  capitalize!" onClick={onClickEditCancelHandler}>Cancel</Button>
          </div>
        </Modal>


        <Modal isOpen={isDeleteModalOpen} open={openDeleteModal} close={closeDeleteModal} title='Delete Product' >
          Are you sure you want to delete this product?
          <div className="flex space-x-3 mt-5">
            <Button className="bg-violet-700 hover:bg-violet-800 capitalize!" onClick={onDeleteSubmitHandler}>Yes , Delete It</Button>
            <Button className="bg-red-500 hover:bg-red-700  capitalize!" onClick={onClickDeleteCancelHandler}>Cancel</Button>
          </div>
        </Modal>
      </div>
      <Toastr message="Product added successfully!" type="success" showAlert={showCreateAlert} setShowAlert={setShowCreateAlert} />
      <Toastr message="Product edited successfully!" type="warning" showAlert={showEditAlert} setShowAlert={setShowEditAlert} />
      <Toastr message="Product deleted successfully!" type="danger" showAlert={showDeleteAlert} setShowAlert={setShowDeleteAlert} />
    </>
  )
}

export default App
