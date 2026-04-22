interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
    color: string,
    borderColor?: string
}

const ColorCircle = ({ color, borderColor, ...rest }: IProps) => {
    return (
        <span className={`w-5 h-5 rounded-full cursor-pointer border ${borderColor || 'border-violet-700'}`} style={{ backgroundColor: color }} {...rest} />
    )
}

export default ColorCircle