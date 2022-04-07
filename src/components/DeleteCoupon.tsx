import { IconButton } from '@mui/material'
import { DeleteIconRed } from '../styles/Styles'

// firebase imports
import { db } from '../firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const deleteHandler = async (event: any,data: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete?')) {
        const ref = doc(db, 'coupons', data.id)
        await deleteDoc(ref)
        toast.success('Successfully deleted coupon')
    }
    console.log('Delete item ', data.id)
}

function DeleteCoupon({ cellData }: any) {
    return (
        <IconButton aria-label="delete" onClick={(event) => deleteHandler(event,cellData)}>
            <DeleteIconRed />
        </IconButton>
    )
}
export default DeleteCoupon
