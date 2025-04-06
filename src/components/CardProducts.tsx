import { Iproduct } from "../interface";
import { txtSlices } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
interface IProps {
    product: Iproduct;
}

const CardProducts = ({ product }: IProps) => {
    return (
        <div className="border rounded-md p-2 mx-auto max-w-sm md:max-w-lg md:mx-0 flex flex-col justify-between">
            <Image imageURL={product.imageURL}
            altImage={product.title}
            className="rounded-md w-20"
            />
            <h3 className="my-2 uppercase">{product.title}</h3>
            <p className="capitalize">
                {txtSlices(product.description)}
            </p>
            <div className="flex space-x-2 my-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-black cursor-pointer"></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-indigo-600">${product.price}</span>
                <Image imageURL={product.imageURL}
                altImage={product.title}
                className="w-10 h-10 rounded-full object-bottom"
                />
            </div>
            <div className="flex justify-between items-center space-x-2 text-white mt-2">
                <Button width="w-full" className="bg-indigo-500 hover:bg-indigo-700" onClick={() => console.log('clicked!')}>Edit</Button>
                <Button width="w-full" className="bg-red-500 hover:bg-red-700">Destroy</Button>
            </div>
        </div>
    )
}

export default CardProducts;    