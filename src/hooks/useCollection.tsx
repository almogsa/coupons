import { SetStateAction, useEffect, useRef, useState } from 'react'
// firebase imports
import { db } from '../firebase.config'
import {
    collection,
    CollectionReference,
    DocumentData,
    FieldPath,
    onSnapshot,
    Query,
    query,
    QueryConstraint,
    where,
    WhereFilterOp,
} from 'firebase/firestore'

export const useCollection = (
    collectionName: string,
    _query?: [
        fieldPath: string | FieldPath,
        opStr: WhereFilterOp,
        value: unknown
    ]
) => {
    const [documents, setDocuments] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const q:
        | [fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown]
        | undefined = useRef(_query).current
    //.doc('12345').get() as firebase.firestore.DocumentSnapshot<Product>;
    //    const q = query(
    //     listingsRef,
    //     where("type", "==", params.categoryName),
    //     orderBy("timestamp", "desc"),
    //     limit(10)
    //   );
    //listingsRef = collection(db, "listings") as CollectionReference<ListingsDataType>;
    useEffect(() => {
        let ref = collection(db, collectionName) /// get a collection reference
        //const p = ...query
        if (q) {
            ref = query(ref, where(...q)) as CollectionReference<DocumentData>
        }
        const unsubscribe = onSnapshot(ref, (snapshot: { docs: any[] }) => {
            let results: SetStateAction<any> = []
            snapshot.docs.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() })
            })

            setTimeout(() => {
                setDocuments(results)
                setLoading(false)
            }, 1000)
        })

        return () => unsubscribe()
    }, [collectionName, q])
    return { documents, loading }
}
