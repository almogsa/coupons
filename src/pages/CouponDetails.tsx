import React from 'react'
import { useForm, Resolver } from 'react-hook-form'
import styled from 'styled-components'
import moment from 'moment'
import { Styles } from '../styles/Styles'
import { Coupon } from '../types/types'

export function addressValidator(address: string) {
    if (address === '123 1st St., New York, NY') {
        return true
    }
    return false
}

export function Error({ errors }: any) {
    console.log('Errror', errors)

    return <div className={'error'}>{errors ? errors.message : ' '}</div>
}

const resolver: Resolver<Coupon> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                  firstName: {
                      type: 'required',
                      message: 'This is required.',
                  },
              }
            : {},
    }
}
export function Form({ coupon, onSubmitHandler }: CouponProps) {
    const {
        name,
        discountedPrice,
        code,
        dueDate,
        regularPrice,
        type,
        timestamp,
        id,
    } = (coupon as Coupon) || {}

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<Coupon>({})
    const onSubmit = handleSubmit((coupon) =>
        onSubmitHandler
            ? onSubmitHandler({
                  ...coupon,
                  timestamp: timestamp || undefined,
                  //  id: id || undefined,
              })
            : console.log(coupon)
    )
    //debugger;

    console.log('Got Coupon ', name)
    return (
        <form onSubmit={onSubmit}>
            <h1>Coupon Details </h1>

            <label>Type</label>
            <select {...register('type')}>
                <option value="pais">Pais</option>
                <option value="mcdonalds">Mcdonalds</option>
                <option value="buyme">Buyme</option>
                <option value="load">Load</option>
                <option value="other">Other</option>
            </select>
            {/* <input
                type="text"
                {...register('type', { required: true, value: type })}
            /> */}
            <Error errors={errors.type} />

            <label>Name</label>
            <input
                type="text"
                {...register('name', { required: true, value: name })}
            />
            <Error errors={errors.name} />

            <label> Regular Price</label>
            <input
                {...register('regularPrice', {
                    value: regularPrice,
                    required: true,
                })}
            />
            <Error errors={errors.regularPrice} />

            <label>discounted Price </label>
            <input
                {...register('discountedPrice', {
                    value: discountedPrice,
                })}
            />
            <Error errors={errors.discountedPrice} />

            {/* <label>Address</label>
     <input
       {...register('address',{
         required: true,
         validate: value => addressValidator(value) || 'Invalid address',
       })}
     />
     <Error errors={errors.address} /> */}
            <label>Order Code</label>
            <input
                {...register('code', {
                    value: code,
                })}
            />
            <Error errors={errors.code} />
            <label>Due Date</label>
            <input
                {...register('dueDate', { required: true, value: dueDate })}
                type="date"
                // max={moment().format('YYYY-MM-DD')}
            />
            <Error errors={errors.dueDate} />

            <input
                className="formInputFile"
                type="file"
                id="images"
                //    onChange={onMutate}
                max="1"
                accept=".jpg,.png,.jpeg"
                multiple
                {...register('imgUrls', { required: false })}
            />

            <input type="submit" className="submitButton" />
        </form>
    )
}

type CouponProps = {
    coupon?: Coupon
    onSubmitHandler?: (coupon: Coupon) => void
}
export default function CouponDetails({
    coupon,
    onSubmitHandler,
}: CouponProps) {
    console.log(' Details, ', coupon)
    return (
        <Styles>
            <Form coupon={coupon} onSubmitHandler={onSubmitHandler} />
        </Styles>
    )
}
