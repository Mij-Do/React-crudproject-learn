import CardProducts from "./components/CardProducts"
import Button from "./components/ui/Button"
import Modal from "./components/ui/Modal"
import { productsList } from "./data"
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
  const renderProduct = productsList.map(product => <CardProducts key={product.id} product={product}/>)
  return (
      <main className="container mx-auto">
        <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600 text-white" onClick={open}>
          Add
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2">
          {renderProduct}
        </div>
        <Modal isOpen={isOpen} closeModal={close} title="Add Product">
          <div className="flex items-center space-x-2 text-white">
            <Button width="w-full" className="bg-indigo-400 hover:bg-indigo-600">Submit</Button>
            <Button width="w-full" className="bg-red-300 hover:bg-red-500">Cancel</Button>
          </div>
        </Modal>
      </main>
  )
}

export default App
