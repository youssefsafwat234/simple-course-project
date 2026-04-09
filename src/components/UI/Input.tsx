
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = ({ ...rest }: IProps) => {
    return (
        <input  {...rest} />
    );
}

export default Input