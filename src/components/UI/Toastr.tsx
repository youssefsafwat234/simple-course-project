interface IProps {
    message: string;
    type: "success" | "error" | "warning" | "danger" | "info";
    showAlert: boolean;
    setShowAlert: (value: boolean) => void;
}

const Toastr = ({ message, type, showAlert, setShowAlert }: IProps) => {
    if (showAlert) {
        setInterval(() => {
            setShowAlert(false);
        }, 5000);
    }
    return (
        showAlert && <div className="toast toast-top toast-center">
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default Toastr