import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import paisImage from '../assets/jpg/logo-pais.png'
import CouponDetails from './CouponDetails'
import CategoryView from '../components/CategoryView'
import styled from 'styled-components'
import { GroupedItemType } from '../types/types'
import React from 'react'

export const Container = styled.div`
    display: flex;
    grid-gap: 40px;
    flex-wrap: wrap;
`

function Explore() {
    const categoryArr = Object.values(GroupedItemType)
        .filter((x) => !isNaN(Number(x)))
        .map((cat: any) => cat)

    return (
        <div className="explore">
            <header>
                <p className="pageHeader">Categories</p>
            </header>
            <div>
                <p className="exploreCategoryHeading">Categories</p>
                <Container>
                    {categoryArr.map((cat: any, i: number) => (
                        <React.Fragment key={i}>
                            <CategoryView type={cat}></CategoryView>
                        </React.Fragment>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default Explore
