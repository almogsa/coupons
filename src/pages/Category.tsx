import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import { Coupon } from '../types/types'
import CoupunsListTable from './CouponsListTable'

function Category() {
    const [listings, setCoupons] = useState<Coupon[]>([])
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState<Coupon>({})

    const params = useParams()

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                // Get reference
                const copunsRef = collection(db, 'coupons')

                // Create a query
                const q = query(
                    copunsRef,
                    where('type', '==', params.categoryName),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )

                // Execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible as unknown as Coupon)

                const coupons: Coupon[] = []

                querySnap.forEach((doc) => {
                    return coupons.push({
                        id: doc.id,
                        data: doc.data() as any,
                    })
                })

                setCoupons(coupons)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch coupons')
            }
        }

        fetchCoupons()
    }, [params.categoryName])

    // Pagination / Load More
    const onFetchMoreListings = async () => {
        try {
            // Get reference
            const couponsRef = collection(db, 'coupons')

            // Create a query
            const q = query(
                couponsRef,
                where('type', '==', params.categoryName),
                orderBy('timestamp', 'desc'),
                startAfter(lastFetchedListing),
                limit(10)
            )

            // Execute query
            const querySnap = (await getDocs(q)) as any
            //const querySnap = await getDocs()

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchedListing(lastVisible as unknown as Coupon)

            const listings: Coupon[] = []

            querySnap.forEach((doc: { data: () => any; id: any }) => {
                console.log(doc.data())
                return listings.push({
                    id: doc.id,
                    data: doc.data() as any,
                })
            })

            setCoupons((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            console.log(error)
            //   toast.error('Could not fetch coupons')
        }
    }

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                border: '1px solid yellow',
            }}
        >
            <CoupunsListTable></CoupunsListTable>
        </div>
        // <div className='category'>
        //   <header>
        //     <p className='pageHeader'>
        //       {params.categoryName === 'rent'
        //         ? 'Places for rent'
        //         : 'Places for sale'}
        //     </p>
        //   </header>

        //   {loading ? (
        //     <Spinner />
        //   ) : listings && listings.length > 0 ? (
        //     <>
        //       <main>

        //         <ul className='categoryListings'>
        //           {listings.map((listing) => (
        //             <ListingItem
        //               listing={listing.data}
        //               id={listing.id}
        //               key={listing.id} onEdit={undefined} onDelete={undefined}                />
        //           ))}
        //         </ul>
        //       </main>

        //       <br />
        //       <br />
        //       {lastFetchedListing && (
        //         <p className='loadMore' onClick={onFetchMoreListings}>
        //           Load More
        //         </p>
        //       )}
        //     </>
        //   ) : (
        //     <p>No coupons for {params.categoryName}</p>
        //   )}
        // </div>
    )
}

export default Category
