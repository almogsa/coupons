import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/swiper-bundle.css'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import CouponDetails from './CouponDetails'
import { Coupon } from '../types/types'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import {
    getDoc,
    doc,
    addDoc,
    collection,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore'

import { toast } from 'react-toastify'
import DisplayCoupon from './DisplayCoupon'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function LoadCoupon() {
    const [coupon, setCoupon] = useState<Coupon>({})
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchCoupon = async () => {
            const docRef = doc(db, 'coupons', params?.couponId || '')
            const docSnap = await getDoc(docRef)
            console.log('fetch coupon', params?.couponId, docSnap.data())
            if (docSnap.exists()) {
                setCoupon({ ...docSnap?.data(), id: docSnap.id })
                setLoading(false)
            }
        }

        fetchCoupon()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    const handleSubmit = async (coupon: Coupon) => {
        console.log('Got data handle submit', coupon)
        if (coupon && !coupon.timestamp) {
            coupon.timestamp = serverTimestamp()
        }
        if (auth.currentUser) {
            coupon.userRef = auth.currentUser.uid
        }
        let docRef
        if (coupon.id) {
            docRef = doc(db, 'coupons', coupon.id)
            await updateDoc(docRef, coupon)
        } else {
            // add new coupon
            docRef = await addDoc(collection(db, 'coupons'), coupon)
        }

        setLoading(false)
        toast.success('Listing saved')
        navigate(`/category/${coupon.type}/${docRef.id}`)
    }

    return (
        <main>
            {/* <CouponDetails
                coupon={coupon}
                onSubmitHandler={handleSubmit}
            ></CouponDetails> */}
            <DisplayCoupon coopon={coupon}></DisplayCoupon>
        </main>
    )
}

export default LoadCoupon

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
