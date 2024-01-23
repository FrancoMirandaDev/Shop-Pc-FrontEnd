import { Routes, Route, Link } from "react-router-dom"
import { Store } from "./Store"
import { Button } from "react-bootstrap"

export function Home() {
  return (
  <>
    <h1>Home</h1>
    <p>Welcome to the Home Page</p>
    <Link to="/store"><Button>Go to Store</Button></Link>
    <Routes>
      <Route path="/store" element={<Store />} />
    </Routes>
  </>
  )
}
