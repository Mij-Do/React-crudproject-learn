interface IProps {
    msg: string;
}

const ErrorsMsg = ({ msg }: IProps) => {
    return (
        msg ? <span className="block text-red-400 font-semibold text-sm">{msg}</span> : null 
    )
}

export default ErrorsMsg;