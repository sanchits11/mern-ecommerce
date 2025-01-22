import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import { MoveRight } from 'lucide-react'
import { useCartStore } from '../stores/useCartStore'
import { Sailboat } from 'lucide-react'
import {loadStripe} from '@stripe/stripe-js'
import axios from '../lib/axios'

const stripePromise = loadStripe("pk_test_51QbL9MRsCT1ju6nOeWTvdaWwLzJGgS8urL6OgS1XdA2AhhCUJSk5CKPmk0bemTzEkHdfqxkwhVtdt06D3a1vTfjX00Xd5e5lKs")

const OrderSummary = () => {

    const {total,subtotal,coupon ,isCouponApplied, cart } = useCartStore()

    const savings = subtotal-total
    const cleanSubtotal = subtotal.toFixed(2) // decimal till 2 places
    const cleanSavings = savings.toFixed(2)
    const cleanTotal = total.toFixed(2)

	const handleStripePayment = async() => {
		const stripe = await stripePromise
		const res = await axios.post("payments/create-checkout-session", {
			products: cart, 
			coupon: coupon ? coupon.code : null
		})

		const session = res.data
		const result = await stripe.redirectToCheckout({
			sessionId: session.id
		})

		if(result.error){
			console.error("Error:", result.error)
		}
	}

  return (
    <motion.div 
        className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <p className='text-xl font-semibold text-blue-400'> Order Details </p>

        <div className='space-y-4'>
            <div className='space-y-2'>
                <dl className='flex items-center justify-between gap-4'>
					<dt className='text-base font-normal text-gray-300'>Original price</dt>
					<dd className='text-base font-medium text-white'>${cleanSubtotal}</dd>
				</dl>

                {savings > 0 && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Savings</dt>
						<dd className='text-base font-medium text-emerald-400'>-${cleanSavings}</dd>
					</dl>
				)}

				{coupon && isCouponApplied && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
						<dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
					</dl>
				)}

                <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
					<dt className='text-base font-bold text-white'>Total</dt>
					<dd className='text-base font-bold text-emerald-400'>${cleanTotal}</dd>
				</dl>

                
            </div>
            <motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleStripePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>

        </div>

    </motion.div>
  )
}

export default OrderSummary