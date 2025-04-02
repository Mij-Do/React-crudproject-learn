import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLElement>{
    children: ReactNode;
    className?: string;
    width: 'w-full' | 'w-fit';
}

const Button = ({children, className, width, ...rest}: IProps) => {
    return (
        <>
            <button className={`${className} ${width} p-2 rounded-md cursor-pointer transition`} {...rest}>{children}</button>
        </>
    )
}

export default Button;