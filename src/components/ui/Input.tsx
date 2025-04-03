import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{ }

const Input = ({...rest}: IProps) => {
    return (
        <>
            <input className="p-2 outline-0 border-0 bg-indigo-300 rounded-md text-white" {...rest}/>
        </>
    )
}

export default Input;