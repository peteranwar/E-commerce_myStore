import React from 'react';
import { Divider, Button, Typography} from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

 const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function PaymentForm({ checkoutToken, shippingData, backStep, nextStep, handleCaptureCheckout, timeout}) {
        const handleSubmit = async (e, elements, stripe) => {
           e.preventDefault();
           if (!elements || !stripe) return;


           const cardElement = elements.getElement(CardElement);
   
           const { error, paymentMethod} = await stripe.createPaymentMethod({ type: 'card', card: cardElement})
   
          if(error){
                console.log(error);
          } else{
              const orderData = {
                  line_items: checkoutToken.live.line_items,
                  customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
                  shipping: {
                      name: 'primary',
                      street: shippingData.street1,
                      town_city: shippingData.city,
                      county_state: shippingData.shippingSubdivision,
                      postal_zip_code: shippingData.zip,
                      country: shippingData.shippingCountry,
                  },
                  fullfillment: { shipping_method: shippingData.shippingOption},
                  payment: {
                      gateway: 'stripe',
                      stripe: {
                          payment_method_id: paymentMethod.id
                      }
                  }
              }
              handleCaptureCheckout(checkoutToken.id, orderData);
              
              timeout();
              nextStep();
          }
     }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '15 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
               <ElementsConsumer>
                  {({ elements, stripe }) => (
                      <form   onSubmit={(e) => handleSubmit(e, elements, stripe)} >
                      <CardElement />
                      <br/>                      <br/>
                      <div style={{ display : 'flex', justifyContent: 'space-between'}}>
                         <Button variant="outlined" onClick={backStep}> Back</Button>
                         <Button variant="contained" type="submit" color="primary" disabled={!stripe}> 
                           Pay { checkoutToken.live.subtotal.formatted_with_symbol }
                         </Button>
                      
                      </div>
                      </form>
                  )}
               </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
