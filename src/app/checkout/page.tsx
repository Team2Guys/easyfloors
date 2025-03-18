import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'
import Checkout from './Checkout'

const CheckoutPage = async () => {
  return (
    <>
    <Breadcrumb title="Checkout" />
    <Checkout />
    </>
  )
}

export default CheckoutPage