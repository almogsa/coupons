import styled from 'styled-components'
import { Coupon } from '../types/types'
import { CategoryData } from './CategoryView'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'

type Props = {
    // type: GroupedItemType
    coupon: Coupon | any
    id: string
    onEdit: (id: string) => void
    onDelete: (id: string, name: string) => void
}

export const Image = styled.img`
    height: 15vw;
    width: 20vw;
    border-radius: 1.5rem;
    object-fit: cover;
`

export const Container = styled.div`
    //height: 15vw;
    //width: 20vw;
    display: grid;
    display: grid;
    grid-template-columns: 90px 1fr 0.5fr;
    grid-template-rows: 30px 30px;
    /* grid-column-gap: 10px; */
    grid-row-gap: 5px;
    border: 1px dashed gray;
    padding: 5px;
    max-width: 500px;
`

export const Category = styled.div`
    backgroud-color: red;
    grid-row: span 2;
    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Header = styled.div`
    //height: 15vw;
    //width: 20vw;
    // grid-area: category;

    justify-self: center;
`
export const Code = styled.div`
    //height: 15vw;
    //width: 20vw;
    // grid-area: category;

    justify-self: center;
    //    border: 1px dashed blue;
`

function CouponView({ id, coupon, onEdit, onDelete }: Props) {
    console.log(coupon, id, CategoryData[coupon?.type || ''])
    //  const { link, header, image } = CategoryData[coupon?.type|| '']
    return (
        <Container>
            <Category>{coupon.type} </Category>
            <Header>{coupon.name}</Header>
            {onEdit && (
                <EditIcon
                    style={{ justifySelf: 'end' }}
                    onClick={() => onEdit(coupon.id || '')}
                />
            )}
            <Code>
                {' '}
                <span>code: </span>
                {coupon.code}
            </Code>
            {onDelete && (
                <DeleteIcon
                    style={{ justifySelf: 'end' }}
                    fill="rgb(231, 76,60)"
                    onClick={() =>
                        onDelete(coupon?.id || '', coupon?.name || '')
                    }
                />
            )}
        </Container>
    )
}
export default CouponView
