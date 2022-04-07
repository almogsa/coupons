//@flow
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import BaseTable, { AutoResizer } from 'react-base-table'
import 'react-base-table/styles.css'
import Empty from './empty'
import Loader from './loader'
import components from './components'
import { Content } from './style'

//////
///  https://codesandbox.io/s/p8fuh?file=/src/App.js
////////

interface Props {
    data: any
    loading: any
    children: any
    rowKey: any
    sortBy: any
    headerHeight: any
    rowHeight: any
    onColumnSort: any
    onClickRow: any
    onDoubleClickRow: any
    rowClassName: any
}

const Table = ({
    data,
    loading,
    children,
    rowKey,
    sortBy,
    headerHeight,
    rowHeight,
    onColumnSort,
    onClickRow,
    onDoubleClickRow,
    rowClassName,
}: Props) => {
    console.log(data)

    return (
        <Content>
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        fixed
                        emptyRenderer={<Empty loading={loading} />}
                        overlayRenderer={<Loader loading={loading} />}
                        data={data}
                        width={width}
                        height={height}
                        headerHeight={headerHeight}
                        rowHeight={rowHeight}
                        rowClassName={rowClassName}
                        rowKey={rowKey}
                        components={components}
                        sortBy={sortBy}
                        onColumnSort={onColumnSort}
                        rowEventHandlers={{
                            onClick: onClickRow,
                            onDoubleClick: onDoubleClickRow,
                        }}
                    >
                        {children}
                    </BaseTable>
                )}
            </AutoResizer>
        </Content>
    )
}

export default Table
