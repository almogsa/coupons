import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import {
    updateDoc,
    doc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { Coupon, FormData } from '../types/types'
import CouponView from '../components/CouponView'

function Profile() {
    const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: auth?.currentUser?.displayName || '',
        email: auth?.currentUser?.email || '',
    })

    const { name, email }: FormData = formData

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserListings = async () => {
            const listingsRef = collection(db, 'coupons')

            const q = query(
                listingsRef,
                where('userRef', '==', auth?.currentUser?.uid),
                orderBy('timestamp', 'desc')
            )

            const querySnap = await getDocs(q)

            let coupons: any[] = []

            querySnap.forEach((doc) => {
                return coupons.push({
                    id: doc.id,
                    data: doc.data() as Coupon,
                })
            })

            setCoupons(coupons)
            setLoading(false)
        }

        fetchUserListings()
    }, [auth?.currentUser?.uid])

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth?.currentUser?.displayName !== name && auth.currentUser) {
                // Update display name in fb
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })

                // Update in firestore
                const userRef = doc(db, 'users', auth.currentUser?.uid)
                await updateDoc(userRef, {
                    name,
                })
            }
        } catch (error) {
            console.log(error)
            toast.error('Could not update profile details')
        }
    }

    const onChange = (e: { target: { id: any; value: any } }) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onDelete = async (couponId: string) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteDoc(doc(db, 'coupons', couponId))
            const updatedListings = coupons.filter(
                (coupon: Coupon) => coupon.id !== couponId
            )
            setCoupons(updatedListings)
            toast.success('Successfully deleted listing')
        }
    }

    const onEdit = (couponId: any) => navigate(`/edit-listing/${couponId}`)

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type="button" className="logOut" onClick={onLogout}>
                    Logout
                </button>
            </header>

            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            changeDetails && onSubmit()
                            setChangeDetails((prevState) => !prevState)
                        }}
                    >
                        {changeDetails ? 'done' : 'change'}
                    </p>
                </div>

                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={
                                !changeDetails
                                    ? 'profileName'
                                    : 'profileNameActive'
                            }
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className={
                                !changeDetails
                                    ? 'profileEmail'
                                    : 'profileEmailActive'
                            }
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>

                <Link to="/create-new-coupon" className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Add new coupon</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>
                <Link to="/create-coupon" className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Sell or rent your home</p>
                    <img src={arrowRight} alt="arrow right" />
                </Link>

                {!loading && coupons?.length > 0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <div className="listingsList" style={{}}>
                            {coupons.map((coupon) => (
                                <>
                                    {/* <ListingItem
                                    key={coupon.id}
                                    listing={coupon.data}
                                    id={coupon.id}
                                    onDelete={() => onDelete(coupon.id || '')}
                                    onEdit={() => onEdit(coupon.id)} /> */}
                                    <CouponView
                                        key={coupon.id}
                                        coupon={coupon?.data}
                                        id={coupon?.id || ''}
                                        onDelete={() =>
                                            onDelete(coupon.id || '')
                                        }
                                        onEdit={() => onEdit(coupon.id)}
                                    />
                                </>
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    )
}

export default Profile
