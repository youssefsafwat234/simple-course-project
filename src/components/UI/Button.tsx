import type { ReactNode } from "react"

interface IProps {
    className?: string,
    children?: ReactNode,
    width?: 'w-full' | 'w-fit' | 'w-auto' | 'w-1/2' | 'w-1/3' | 'w-1/4' | 'w-1/5' | 'w-1/6' | 'w-1/12',
}

const Button = ({ className, children , width = 'w-full', ...rest }: IProps) => {
    return (
        <>
            <button className={`${className} text-white font-bold py-2 px-4 rounded cursor-pointer ${width} uppercase`} {...rest}>
                {children}
            </button>
        </>
    )
}

export default Button