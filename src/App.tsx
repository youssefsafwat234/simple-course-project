import './App.css'
import ProductCard from './components/ProductCard'
import Button from './components/UI/Button'

function App() {

  return (

    <div>
      <div className=' m-6 flex justify-between items-center'>
        <div className='text-2xl'>
          Latest <span className='text-violet-700 font-bold'>Products</span>
        </div>

        <Button width='w-fit' className="bg-violet-700 hover:bg-violet-800 capitalize" >Buy Now</Button>

      </div>
      <div className='m-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />

      </div>
    </div>
  )
}

export default App
