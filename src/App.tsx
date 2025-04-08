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
import { TProduct } from "./Types"


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
  const [errors, setErrors] = useState({title: '', price: '', description: '', imageURL: '',});
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [products, setProducts] = useState<Iproduct[]>(productsList);
  const [product, setProduct] = useState<Iproduct>(defaultProduct);
  const [editProduct, setEditProduct] = useState<Iproduct>(defaultProduct);
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
    const errors = productValidation({
      title: product.title,
      price: product.price,
      description: product.description,
      imageURL: product.imageURL,
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
    const errors = productValidation({
      title: product.title,
      price: product.price,
      description: product.description,
      imageURL: product.imageURL,
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

  const onCancel = () => {
    setProduct(defaultProduct);
    close();
  }
  // render
  const renderProduct = products.map(product => <CardProducts key={product.id} product={product} setEditProduct={setEditProduct} openEdit={openEdit}/>)
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
                  setTempColor((prev) => [...prev, color])
                }}/>);
  const renderEditProduct = (id: string, name: TProduct, label: string) => {
    return (
        <>
          <div className="flex flex-col text-indigo-500 mb-1">
            <label htmlFor={id}>{label}</label>
            <Input type="text" id={id} name={name} value={editProduct[name]} onChange={onChangeEditHandeler} />
          </div>
        </>
    )
  }

  return (
      <main className={`${isOpen ? 'opacity-30' : 'opacity-100'} container mx-auto `}>
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
              {tempColor.map(color => <span key={color} className="text-white rounded-md p-1 ml-1 text-sm" style={{backgroundColor: color}}>{color}</span>)}
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

            <div className="flex items-center space-x-2 text-white">
                <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600">Submit</Button>
                <Button width="w-full" className="bg-red-300 hover:bg-red-500" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </main>
  )
}

export default App;

