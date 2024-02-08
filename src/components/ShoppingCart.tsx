import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"
import axios from "axios"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()

  const sendCartToBackend = async () => {
    console.log(cartItems)
    try{
      await axios.post("http://localhost:9000/api/paymentStripe", {cartItems})
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
          <div className="d-grid gap-4">
            {cartItems.length > 0 && (
              <>
                <button className="btn btn-primary" onClick={sendCartToBackend}>Checkout with Stripe <img src={`/svg/stripe.svg`} alt="stripe" className="p-1"/></button>
                <button className="btn btn-primary" onClick={sendCartToBackend}>Checkout with MercadoPago<img src={`/svg/mercadopago.svg`} alt="mercadopago" className="p-1"/></button>
              </>
            )}
          </div>
          <p>Testing mode on:<br/><strong>Fake Payment</strong></p>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
