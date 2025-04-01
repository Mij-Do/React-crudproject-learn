interface IProps {
    imageURL: string;
    altImage: string;
    className: string;
}

const Image = ({imageURL, altImage, className}: IProps) => {
    return (
        <>
            <img src={imageURL} 
            alt={altImage} 
            className={className}/>
        </>
    )
}

export default Image;