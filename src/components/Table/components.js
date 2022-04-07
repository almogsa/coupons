import React from 'react'
import Thumbnail from './thumbnail'
import Types from './types'
import { Type } from './style'
import { DeleteIconRed } from '../../styles/Styles'

const Cell = ({ className, cellData, column }) => {
    const { dataKey } = column
    switch (dataKey) {
        case 'thumbnail':
            return <Thumbnail src={cellData} />
        case 'type':
            return <Type type={cellData}>{cellData}</Type>
        //   case 'action':
        //       return (
        //           <IconButton aria-label="delete">
        //               <DeleteIconRed />
        //           </IconButton>
        //       )
        default:
            return <div className={className}>{cellData}</div>
    }
}

export default {
    TableCell: Cell,
}
