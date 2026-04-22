import { categories } from "../../data"

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {    
    defaultValue?: string

}

const selectOptions = categories.map(category =>
    <option key={category.id} value={category.name}>
        {category.name}
    </option>
)

const Select = ({ onChange , defaultValue }: IProps) => {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="location" className='text-sm font-medium text-gray-700'>Category</label>
            <select defaultValue={defaultValue} id="location" className="select select-neutral bg-white border-2 border-gray-300 outline-0 w-full" name="location" onChange={onChange} >
                <option disabled={true}>Select Category</option>
                {selectOptions}
            </select>
        </div>
    )
}

export default Select