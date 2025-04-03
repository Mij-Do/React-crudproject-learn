import CardProducts from "./components/CardProducts"
import Modal from "./components/ui/Modal"
import { productsList } from "./data"


function App() {
  const renderProduct = productsList.map(product => <CardProducts key={product.id} product={product}/>)
  return (
    <main className="container mx-auto">
      <Modal />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-2">
        {renderProduct}
      </div>
    </main>
  )
}

export default App
