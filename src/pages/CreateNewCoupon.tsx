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
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export const Container = styled.div`
    height: 100%;
    width: 100%;
`

 type Image = {
     name: string
 }
function CreateNewCoupon() {
    const [coupon, setCoupon] = useState<Coupon>({})
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()


 


    const handleSubmit = async (coupon: Coupon) => {
        console.log('Got data handle submit', coupon);
          const images = coupon.imgUrls;
 // Store image in firebase
 const storeImage = async (image: any) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth?.currentUser?.uid}-${
            image?.name 
        }-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) *
                    100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                        resolve(downloadURL)
                    }
                )
            }
        )
    })
}

const imgFromServer: any = await Promise.all(
    [...images|| []].map((image) => storeImage(image))
).catch(() => {
    setLoading(false)
    toast.error('Images not uploaded')
    return
})


        if (coupon && !coupon.timestamp) {
            coupon.timestamp = serverTimestamp()
        }
        if (auth.currentUser) {
            coupon.userRef = auth.currentUser.uid
        }
        coupon.imgUrls = imgFromServer;
        let docRef
        if (coupon.id) {
            docRef = doc(db, 'coupons', coupon.id)
            await updateDoc(docRef, coupon)
        } else {
            // add new coupon
            // coupon.code = '';
            // coupon.location = '';
            // coupon.description = ''
            // coupon.imgUrls = [];
            // coupon.isNew = false;
            // coupon.offer = false;
            // coupon.latitude = 0;
            // coupon.longitude = 0;
            // coupon.geolocation = {lat:0, lng:0}
            delete coupon.id
            docRef = await addDoc(collection(db, 'coupons'), coupon)
        }

        setLoading(false)
        toast.success('Coupon saved')
        navigate(`/category/${coupon.type}/${docRef.id}`)
    }

    return (
        <Container>
            <CouponDetails
                coupon={coupon}
                onSubmitHandler={handleSubmit}
            ></CouponDetails>
        </Container>
    )
}

export default CreateNewCoupon

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
