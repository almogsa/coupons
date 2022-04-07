





// firebase imports
import { db } from '../firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'

export const DeleteIconRed = styled.button`

color:red;
height: 50px;
width: 20px;
`
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
   
             <DeleteIcon
                    className=""
                    fill="rgb(231, 76,60)"
                    onClick={(event) => deleteHandler(event,cellData)}
                />
   
    )
}
export default DeleteCoupon
