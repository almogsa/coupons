import styled from 'styled-components'
import { Coupon } from '../types/types'



export const Image = styled.img`
    height: 15vw;
    width: 20vw;
    border-radius: 1.5rem;
    object-fit: cover;
`

export const Container = styled.div`
   display: grid;
   grid-template-columns: auto;
   grid-gap:16px;
   justify-content: center;
`
type Props = {
    coopon: Coupon
}
function DisplayCoupon({ coopon }: Props) {
    const { name, code,regularPrice, imgUrls } = coopon
    return (
        <div className="category">
     
        <Container>
        <header>
            <p className="pageHeader">Coupon Details</p>
        </header>
          { imgUrls && <div style={{textAlign: 'center'}}>
            <Image src={imgUrls?imgUrls[0] : ''}></Image>
            </div> }
             
            <div>Name: {name}</div>
            <div>regularPrice: {regularPrice}</div>
            <div>Code: {code}</div>
            
        </Container>
        </div>
    )
}
export default DisplayCoupon
