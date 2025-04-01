import CardProducts from "./components/CardProducts"


function App() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
        <CardProducts />
      </div>
    </>
  )
}

export default App
