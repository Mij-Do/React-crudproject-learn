import { Iproduct } from "../interface";
import { txtSlices } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";
interface IProps {
    product: Iproduct;
    setEditProduct: (product: Iproduct) => void;
    openEdit: () => void;
    onRemoveOpen: () => void;
    idx: number;
    setEditProductIdx: (value: number) => void;
}

const CardProducts = ({ product, setEditProduct, openEdit, idx, setEditProductIdx, onRemoveOpen }: IProps) => {
        const {colors, description, imageURL, price, title} = product;

        const renderColorCircle = colors.map(color => 
            <CircleColor 
                key={color} 
                color={color}
            />);
            // handeler
            const onEdit = () => {
                setEditProduct(product);
                openEdit();
                setEditProductIdx(idx);
            }

            const onRemove = () => {
                onRemoveOpen();
            }
    return (
        <div className="border rounded-md p-2 mx-auto max-w-sm md:max-w-lg md:mx-0 flex flex-col justify-between">
            <Image imageURL={imageURL}
                altImage={title}
                className="rounded-md w-20"
            />
            <h3 className="my-2 uppercase">{title}</h3>
            <p className="capitalize">
                {txtSlices(description)}
            </p>
            <div className="flex space-x-2 my-2">
                {renderColorCircle}
            </div>
            <div className="flex justify-between items-center">
                <span className="text-indigo-600">${price}</span>
                <Image imageURL={imageURL}
                altImage={title}
                className="w-10 h-10 rounded-full object-bottom"
                />
            </div>
            <div className="flex justify-between items-center space-x-2 text-white mt-2">
                <Button width="w-full" className="bg-indigo-500 hover:bg-indigo-700" onClick={onEdit}>Edit</Button>
                <Button width="w-full" className="bg-red-500 hover:bg-red-700" onClick={onRemove}>Remove</Button>
            </div>
        </div>
    )
}

export default CardProducts;    