import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement, CardElement, Elements } from '@stripe/react-stripe-js';
import { useCartContext } from '../context/cart_context';
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Article } from "@mui/icons-material";
import { formatPrice } from "../utils/helper";
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'


const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!)

const CheckoutForm = () => {
    const { cart_products, total_quantity, checkout_price, clearCart, shipping } = useCartContext()
    const { user } = useAuth0()

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState('')

    const [processing, setProcessing] = useState(false)
    const [disable, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const cardStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    }
    const createPaymentIntent = async () => {
        try {
            const { data } = await axios.post(
                '/.netlify/functions/create-payment-intent',
                JSON.stringify({ cart_products, checkout_price, shipping })
            )
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        createPaymentIntent()
    }, [])
    const handleChange = async (event: StripeCardElementChangeEvent) => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : '')

    }
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setProcessing(true)
        const payload = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements?.getElement(CardElement)!
            }
        })
        if (payload?.error) {
            setError(`Payment Failed ${payload.error.message}`)
            setProcessing(false)
        } else {
            setError('')
            setProcessing(false)
            setSucceeded(true)
        }
    }
    return <div >
        {
            succeeded ?
                <article className="title">
                    <h4>Thank you</h4>
                    <h4>Your payment was successful!</h4>
                </article>
                :
                <article className="title">
                    <h4>Hello,{user && user.nickname}</h4>
                    <p>Your total is {formatPrice(checkout_price + shipping)}</p>
                </article>

        }
        <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement
                id="card-element"
                onChange={handleChange}
                options={cardStyle}
            />
            <button
                disabled={succeeded || processing || disable}
                id="submit"
            >
                <span>{processing ? <div className="spinner" id='spinner'></div> : 'pay'}</span>
            </button>
            {error && <div className="card-error" role='alert'>{error}</div>}
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>succeed</p>
        </form>
    </div>
}


const StripeCheckout = () => {
    return (
        <Wrapper>
            <Elements stripe={promise} >
                <CheckoutForm />
            </Elements>
        </Wrapper>
    )
};
const Wrapper = styled.section`
.title{
    display: flex;
    gap: 1rem;
    flex-direction: column;
}
form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}
.result-message {
    line-height: 22px;
    font-size: 16px;
  }
.result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
.hidden {
    display: none;
  }

#payment-message {
  color: rgb(105, 115, 134);
  font-size: 16px;
  line-height: 20px;
  padding-top: 12px;
  text-align: center;
}

#payment-element {
  margin-bottom: 24px;
}

/* Buttons and links */
button {
  background: #5469d4;
  font-family: Arial, sans-serif;
  color: #ffffff;
  border-radius: 4px;
  border: 0;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  width: 100%;
  margin-top: 1rem;
}

button:hover {
  filter: contrast(115%);
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

/* spinner/processing state, errors */
.spinner,
.spinner:before,
.spinner:after {
  border-radius: 50%;
}

.spinner {
  color: #ffffff;
  font-size: 22px;
  text-indent: -99999px;
  margin: 0px auto;
  position: relative;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 2px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.spinner:before,
.spinner:after {
  position: absolute;
  content: '';
}

.spinner:before {
  width: 10.4px;
  height: 20.4px;
  background: #5469d4;
  border-radius: 20.4px 0 0 20.4px;
  top: -0.2px;
  left: -0.2px;
  -webkit-transform-origin: 10.4px 10.2px;
  transform-origin: 10.4px 10.2px;
  -webkit-animation: loading 2s infinite ease 1.5s;
  animation: loading 2s infinite ease 1.5s;
}

.spinner:after {
  width: 10.4px;
  height: 10.2px;
  background: #5469d4;
  border-radius: 0 10.2px 10.2px 0;
  top: -0.1px;
  left: 10.2px;
  -webkit-transform-origin: 0px 10.2px;
  transform-origin: 0px 10.2px;
  -webkit-animation: loading 2s infinite ease;
  animation: loading 2s infinite ease;
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@media only screen and (max-width: 600px) {
  form {
    width: 80vw;
    min-width: initial;
  }
}


`

export default StripeCheckout;
