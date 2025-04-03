import CardProducts from "./components/CardProducts"
import Button from "./components/ui/Button"
import Input from "./components/ui/Input"
import Modal from "./components/ui/Modal"
import { productsList } from "./data"
import { formInputList } from "./data"
import { useState } from 'react'


function App() {
  // states
  const [isOpen, setIsOpen] = useState(false)
  // handelers
  function open() {
      setIsOpen(true)
  }
  
  function close() {
      setIsOpen(false)
  }
  // render
  const renderProduct = productsList.map(product => <CardProducts key={product.id} product={product}/>)
  const renderFormListModal = formInputList.map(input => 
    <div className="flex flex-col text-indigo-500">
      <label htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} />
    </div>
  )
  return (
      <main className="container mx-auto">
        <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600 text-white" onClick={open}>
          Add
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2">
          {renderProduct}
        </div>
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <div className="m-2">
            {renderFormListModal}
          </div>
          <div className="flex items-center space-x-2 text-white">
            <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600">Submit</Button>
            <Button width="w-full" className="bg-red-300 hover:bg-red-500">Cancel</Button>
          </div>
        </Modal>
      </main>
  )
}

export default App
