
import type { ReactNode, ButtonHTMLAttributes } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    width?: 'w-full' | 'w-fit' | 'w-auto' | 'w-1/2' | 'w-1/3' | 'w-1/4' | 'w-1/5' | 'w-1/6' | 'w-1/12';
}

const Button = ({ className, children , width = 'w-full', ...rest }: IProps) => {
    return (
        <>
            <button className={` text-white font-medium py-2 px-4 rounded cursor-pointer ${width} uppercase ${className}` } {...rest}>
                {children}
            </button>
        </>
    )
}

export default Button