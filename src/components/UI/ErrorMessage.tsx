interface IProps {
    message : string;
}

const ErrorMessage = ({ message }: IProps) => {
    return (
        <div className="d-block text-red-500 font-semibold text-sm">{message}</div>
    )
}

export default ErrorMessage