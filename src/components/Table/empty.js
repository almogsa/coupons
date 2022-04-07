import React, { Fragment, memo } from 'react'
import { EmptyBox } from './style'

const Empty = ({ loading }) => {
    return (
        <Fragment>{!loading && <EmptyBox>There is no data</EmptyBox>}</Fragment>
    )
}

export default memo(Empty)
