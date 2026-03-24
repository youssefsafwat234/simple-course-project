interface IProps {

}

const ProductCard = ({ }: IProps) => {
    return (
        <div className="bg-gray-100 p-4 border-2 border-gray-300 rounded">
            <div className="overflow-hidden mb-3">
                <img className="object-cover rounded" src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
            <h3 className="mb-5 text-md">2022 Genesis GV70: Nomine ...</h3>
            <p className="text-sm text-gray-700 ">As luxury brands go, South Korea's Genesis is still
                in its infancy, having sold its first cars (as an independent Hyunda ...)</p>
            <div className="flex space-x-2 mt-3 mb-3">
                <span className="w-5 h-5 rounded-full bg-red-600 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-indigo-600 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-orange-600 cursor-pointer"></span>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-violet-700 font-bold text-lg">$500,000</div>
                <div className="flex items-center justify-between space-x-3">
                    <div className="w-10 h-10">
                        <img className="w-full h-full object-cover rounded-full" src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div>
                        Cars
                    </div>
                </div>
            </div>

            <div className="flex space-x-3 mt-5">
                <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded cursor-pointer w-full uppercase">Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full uppercase">Destroy</button>
            </div>
        </div>
    )
}


export default ProductCard