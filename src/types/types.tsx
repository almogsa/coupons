import { FieldValue } from 'firebase/firestore'

export enum GroupedItemType {
    Pais,
    BuyMe,
    Load,
    McDonalds,
    TenBis,
    Other,
}

export type FormData = {
    name: string
    email: string
    password?: string
    timestamp?: FieldValue
}

export type Geolocation = {
    lat?: number
    lng?: number
}

export type Coupon = {
    id?: string
    name?: string
    description?: string
    address?: string
    timestamp?: FieldValue
    data?: string
    date?: string
    code?: string
    type?: string
    regularPrice?: number
    discountedPrice?: number
    dueDate?: string
    isNew?: boolean
    link?: string
    offer?: boolean
    imgUrls?: string[]
    latitude?: number
    longitude?: number
    location?: string
    userRef?: string
    geolocation?: any
}
