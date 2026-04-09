import { sliceText } from "../../helper/function"
import type { IProduct } from "../../interfaces" 
import Button from "../UI/Button"
import Image from "../UI/Image"
 
interface IProps {
    product: IProduct
}

const ProductCard = ({ product }: IProps) => {
    const { title = "", description = "", price = "", category = { name: "", imageURL: "" }, imageURL } = product || {}
    const colors = product.colors.map((color, index) => {
        return (
            <span
                key={index}
                className="w-5 h-5 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
            />
        )
    })
    return (
        <div className="bg-gray-100 p-4 border-2 border-gray-300 rounded-md flex flex-col justify-between">
            <div className="overflow-hidden mb-3">
                <Image imageUrl={imageURL} altText="Product Image" className="object-cover rounded-md" />
            </div>
            <h3 className="mb-5 text-md">{title}</h3>
            <p className="text-sm text-gray-700 max-h-24 overflow-hidden">{sliceText(description)}</p>
            <div className="flex space-x-2 mt-3 mb-3 flex-wrap space-y-2">
                {colors}
            </div>
            <div className="flex items-center justify-between">
                <div className="text-violet-700 font-bold text-lg">${price}</div>
                <div className="flex items-center justify-between space-x-3">
                    <div className="w-10 h-10">
                        <Image imageUrl={category.imageURL} altText="Seller Image" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                        {category.name}
                    </div>
                </div>
            </div>

            <div className="flex space-x-3 mt-5">
                <Button className="bg-violet-700 hover:bg-violet-800" onClick={() => console.log("Edit")}>Edit</Button>
                <Button className="bg-red-500 hover:bg-red-700 " onClick={() => console.log("Destroy")}>Destroy</Button>
            </div>
        </div>
    )
}


export default ProductCard