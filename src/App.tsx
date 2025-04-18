import CardProducts from "./components/CardProducts"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import Modal from "./components/ui/Modal"
import { categories, colors, productsList } from "./data"
import { formInputList } from "./data"
import { ChangeEvent, FormEvent, useState } from 'react'
import { Iproduct, OptionType } from "./interface"
import { productValidation } from "./validation"
import {v4 as uuid} from "uuid";
import ErrorsMsg  from "./components/ErrorsMsg"
import CircleColor from "./components/CircleColor"
import SelectItem from "./components/ui/SelectItem"
import { TProduct } from "./Types";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const defaultProduct = {
    id: '',
    title: '',
    price: '',
    description: '',
    imageURL: '',
    category: {
      name: '',
      imageURL: '',
    },
    colors: [],
    rating: {
        rate: '',
        count: '',
    },
  };
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [errors, setErrors] = useState({title: '', price: '', description: '', imageURL: '',});
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [products, setProducts] = useState<Iproduct[]>(productsList);
  const [product, setProduct] = useState<Iproduct>(defaultProduct);
  const [editProduct, setEditProduct] = useState<Iproduct>(defaultProduct);
  const [editProductIdx, setEditProductIdx] = useState<number>(0);
  const [selected, setSelected] = useState<OptionType>({
          id: categories[0].id,
          value: categories[0].id, 
          name: categories[0].name, 
          imageURL: categories[0].imageURL,
      });
  // handelers
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openEdit = () => setIsOpenEditModal(true);
  const closeEdit = () => setIsOpenEditModal(false);

  const onRemoveOpen = () => setOpenRemove(true);
  const onRemoveClose = () => setOpenRemove(false);
  
  const onChangeHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;

    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    })
  };
  const onChangeEditHandeler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;

    setEditProduct({
      ...editProduct,
      [name]: value,
    });
  };

  const onSubmitHandeler = (event: FormEvent<HTMLFormElement>): void =>  {
    event.preventDefault();
    const {title, description, price, imageURL} = product;
    const errors = productValidation({
      title,
      price,
      description,
      imageURL,
    })
    

    const hasErrorMsg = Object.values(errors).some(value => value === '') && 
                        Object.values(errors).every(value => value === '');
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts(prev => [{...product, id: uuid(), colors: tempColor, category: selected}, ...prev]);
    setProduct(defaultProduct);
    setTempColor([]);
    close();
  }
  
  const onSubmitEditHandeler = (event: FormEvent<HTMLFormElement>): void =>  {
    event.preventDefault();
    const {title, description, price, imageURL} = editProduct;
    const errors = productValidation({
      title,
      price,
      description,
      imageURL,
    })
    

    const hasErrorMsg = Object.values(errors).some(value => value === '');
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    const updateProduct = [...products];
    updateProduct[editProductIdx] = {...editProduct, colors: tempColor.concat(editProduct.colors)};
    setProducts(updateProduct);
    
    setEditProduct(defaultProduct);
    setTempColor([]);
    closeEdit();
    toast('Product was Update it!', {
      style: {
        backgroundColor: '#4f39f6',
        color: 'white',
      }
    });
  }

  const removeHandeler = () => {
    const filtered = products.filter(product => product.id !== editProduct.id);
    setProducts(filtered);
    onRemoveClose();
    toast('Product was Remove it!', {
      style: {
        backgroundColor: '#fb2c36',
        color: 'white',
      }
    });
  }

  const onCancel = () => {
    setProduct(defaultProduct);
    close();
  }
  // render
  const renderProduct = products.map((product, idx) => 
    <CardProducts key={product.id} 
      product={product} idx={idx} 
      setEditProduct={setEditProduct} 
      openEdit={openEdit} 
      setEditProductIdx={setEditProductIdx}
      onRemoveOpen={onRemoveOpen}
    />);
  const renderFormListModal = formInputList.map(input => 
    <div className="flex flex-col text-indigo-500" key={input.id}>
      <label htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandeler} />
      <ErrorsMsg msg={errors[input.name]} />
    </div>
  );
  const renderColorCircle = colors.map(color => 
    <CircleColor key={color} 
                color={color} 
                onClick={() => {
                  if (tempColor.includes(color)) {
                    setTempColor(prev => prev.filter(item => item !== color))
                    return;
                  }
                  if (editProduct.colors.includes(color)) {
                    setTempColor(prev => prev.filter(item => item !== color))
                    return;
                  }
                  setTempColor((prev) => [...prev, color])
                }}/>);
  const renderEditProduct = (id: string, name: TProduct, label: string) => {
    return (
        <>
          <div className="flex flex-col text-indigo-500 mb-1">
            <label htmlFor={id}>{label}</label>
            <Input type="text" id={id} name={name} value={editProduct[name]} onChange={onChangeEditHandeler} />
            <ErrorsMsg msg={''} />
          </div>
        </>
    )
  }

  const renderRemoveProduct = (label: string, description: string) => {
    return (
        <>
          <div className="flex flex-col text-red-500 mb-1">
            <h2>{label}</h2>
            <p className="my-2">{description}</p>
            <div className="flex items-center space-x-2 text-white">
              <Button width="w-full" className="bg-red-400 hover:bg-red-600" onClick={removeHandeler}>Remove</Button>
              <Button width="w-full" className="bg-gray-400 hover:bg-gray-500" onClick={onRemoveClose}>Cancel</Button>
            </div>
          </div>
        </>
    )
  }
  return (
      <main className={` container mx-auto `}>
        <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600 text-white" onClick={open}>
          Add
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2">
          {renderProduct}
        </div>
        {/* add product */}
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <form onSubmit={onSubmitHandeler}>
            <div className="m-2">
              {renderFormListModal}
            </div>
            <div className="flex space-x-2 my-2">
              {renderColorCircle}
            </div>
            <div className="my-2 flex flex-wrap">
              {tempColor.map(color => 
              <span key={color} 
              className="text-white rounded-md p-1 ml-1 text-sm" 
              style={{backgroundColor: color}}>{color}</span>)}
            </div>
            <div className="my-2"> 
              <SelectItem selected={selected} setSelected={setSelected}/>  
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600">Submit</Button>
              <Button width="w-full" className="bg-red-300 hover:bg-red-500" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* edit product */}
        <Modal isOpen={isOpenEditModal} closeModal={closeEdit} title="Edit Product">
          <form onSubmit={onSubmitEditHandeler}>
            {renderEditProduct('title', 'title', 'Title')}
            {renderEditProduct('description', 'description', 'Description')}
            {renderEditProduct('image', 'imageURL', 'ImageURL')}
            {renderEditProduct('price', 'price', 'Price')}
            <div className="my-2"> 
              <SelectItem selected={editProduct.category} setSelected={value => setEditProduct({...editProduct, category: value})}/>  
            </div>
            <div className="my-2 flex flex-wrap">
              <div className="flex space-x-2 my-2">
                {renderColorCircle}
              </div>
              {tempColor.concat(editProduct.colors).map(color => 
              <span key={color} 
              className="text-white rounded-md p-1 ml-1 text-sm cursor-pointer"
              style={{backgroundColor: color}}>{color}</span>)}
            </div>
            <div className="flex items-center space-x-2 text-white">
                <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600">Submit</Button>
                <Button width="w-full" className="bg-red-300 hover:bg-red-500" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* onRemove */}
        <Modal className={'text-red-600'} isOpen={openRemove} closeModal={onRemoveClose} title="Remove Product">
          {renderRemoveProduct('Remove Product', 'Are you sure you want to remove this product?')}
        </Modal>
        <Toaster />
      </main>
  )
}

export default App;

