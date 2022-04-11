import styled from 'styled-components'
import { colorsType } from '../components/Table/style'

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
    grid-gap: 16px;
    justify-content: center;
`
export const Type = styled.div<{ type: string }>`
    background: ${(props) => colorsType['pais']};
    border-radius: 6px;
    color: #fff;
    display: inline-block;
    font-weight: bold;
    padding: 3px 8px;

    &:first-of-type {
        margin: 0 10px 0 0;
    }
`
type Props = {
    coopon: Coupon
}
function DisplayCoupon({ coopon }: Props) {
    const { name, code, regularPrice, imgUrls, type, dueDate } = coopon
    return (
        <div className="category">
            <Container>
                <header>
                    <div className="pageHeader">Coupon Details</div>
                    <span>
                        {' '}
                        <Type type={type || ''}>{type}</Type>
                    </span>
                </header>
                {imgUrls && (
                    <div style={{ textAlign: 'center' }}>
                        <Image src={imgUrls ? imgUrls[0] : ''}></Image>
                    </div>
                )}

                <div>Name: {name}</div>
                <div>regularPrice: {regularPrice}</div>
                <div>Code: {code}</div>
                <div>Due date: {dueDate}</div>
            </Container>
        </div>
    )
}
export default DisplayCoupon
