import Image from "./Image";
interface IProps {

}

const CardProducts = ({ }: IProps) => {
    return (
        <div className="border rounded-md p-2">
            <Image imageURL="https://www.topgear.com/sites/default/files/images/news-article/carousel/2019/10/68321d888509ea355453e1100665f6ee/mb_190e_evoii-10.jpg"
            altImage="mercedes benz 190 e"
            className="rounded-md"
            />
            <h3 className="my-2 uppercase">mercedes benz 190 e</h3>
            <p className="capitalize">
                The Mercedes-Benz W201 is the internal designation for <span className="text-sky-500">the Mercedes 190</span> series sedans, a range of front-engine,
                rear drive, five passenger, four-door sedans
            </p>
            <div className="flex space-x-2 my-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer"></span>
                <span className="w-5 h-5 rounded-full bg-black cursor-pointer"></span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-indigo-600">$500,000</span>
                <Image imageURL="https://www.topgear.com/sites/default/files/images/news-article/carousel/2019/10/68321d888509ea355453e1100665f6ee/mb_190e_evoii-10.jpg"
                altImage="mercedes benz 190 e"
                className="w-10 h-10 rounded-full object-bottom"
                />
            </div>
            <div className="flex justify-between items-center space-x-2 text-white mt-2">
                <button className="bg-indigo-500 p-2 w-full rounded-md cursor-pointer hover:bg-indigo-700 transition">Edit</button>
                <button className="bg-red-500 p-2 w-full rounded-md cursor-pointer hover:bg-red-700 transition">Destroy</button>
            </div>
        </div>
    )
}

export default CardProducts;    