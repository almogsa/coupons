import { Link } from 'react-router-dom'
import { GroupedItemType } from '../types/types'
import paisImage from '../assets/jpg/pais1.png'
import buyMeImage from '../assets/jpg/buyme.png'
import mcdonaldsImage from '../assets/jpg/mcdonalds.jpeg'
import tenbisImage from '../assets/jpg/tenbis.png'
import loadImage from '../assets/jpg/load.png'
import otherImage from '../assets/jpg/other.png'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import styled from 'styled-components'

export const CategoryData: {
    [key: string]: { link: string; header: string; image: string }
} = {
    [GroupedItemType.Pais]: {
        link: '/category/pais',
        header: 'Pais',
        image: paisImage,
    },
    [GroupedItemType.BuyMe]: {
        link: '/category/buyme',
        header: 'BuyMe',
        image: buyMeImage,
    },
    [GroupedItemType.Load]: {
        link: '/category/load',
        header: 'Pais-Load',
        image: loadImage,
    },
    [GroupedItemType.McDonalds]: {
        link: '/category/mcdonalds',
        header: 'McDonals',
        image: mcdonaldsImage,
    },
    [GroupedItemType.TenBis]: {
        link: '/category/tenbis',
        header: 'Tenbis',
        image: tenbisImage,
    },
    [GroupedItemType.Other]: {
        link: '/category/other',
        header: 'Other',
        image: otherImage,
    },
}

export const Header = styled.div`
    text-align: center;
    padding-top: 12px;
`

type Props = {
    type: GroupedItemType
}

export const Image = styled.img`
    height: 15vw;
    width: 20vw;
    border-radius: 1.5rem;
    object-fit: cover;
`

function CategoryView({ type }: Props) {
    console.log(type, CategoryData[type])
    const { link, header, image } = CategoryData[type]
    return (
        <Link to={link} key={header}>
            <Image src={image} alt={header} />
            <Header>{header}</Header>
        </Link>
    )
}
export default CategoryView
