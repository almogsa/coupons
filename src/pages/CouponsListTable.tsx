//import Table from 'rc-table';
import Button from '@mui/material/Button'
import BaseTable, {
    AutoResizer,
    BaseTableProps,
    Column,
} from 'react-base-table'
import 'react-base-table/styles.css'
import Table from '../components/Table/Table'
import columns from '../components/Table/column-definition'
import rowdata from '../components/Table/data'
import { SetStateAction, useEffect, useState } from 'react'
import { Content } from '../components/Table/style'
import { useCollection } from '../hooks/useCollection'
// firebase imports
import { db } from '../firebase.config'
import { deleteDoc, doc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'

/// Sort

const handleDeleteCoupon = async (id: string) => {
    const ref = doc(db, 'coupons', id)
    await deleteDoc(ref)
    console.log('Delete item ', id)
}

//const handleOnClickRow =
//    (setSelectedRow: {
//        (value: SetStateAction<null>): void
//        (arg0: any): void
//    }) =>
//    ({ rowKey }: any) => {
//        setSelectedRow(rowKey)
//    }

const addClassNameRow =
    (selectedRow: null) =>
    ({ rowData }: any) => {
        const { id } = rowData
        const hasEqualRow = selectedRow === id
        return hasEqualRow && 'active'
    }

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export type SortBy = {
    key: string
    order: SortOrder
}

function CoupunsListTable() {
    const [data, setData] = useState([])
    const [sortBy, setSortBy] = useState<SortBy>({
        key: 'type',
        order: SortOrder.ASC,
    })

    const [selectedRow, setSelectedRow] = useState(null)
    const params = useParams()
    console.log('Param', params)
    const categoryName = params?.categoryName || 'pais'
    const { documents: coupons, loading } = useCollection('coupons', [
        'type',
        '==',
        params.categoryName,
    ])
    //const defaultSort = { key: 'name', order: SortOrder.ASC }
    const navigate = useNavigate()

    const handleOnClickRow = ({ rowData, rowKey, ...rest }: any) => {
        console.log('Data', rowData, rest)
        navigate(`/category/${rowData.type}/${rowData.id}`)
    }

    useEffect(() => {
        console.log('Got Cooupons', coupons)
        setData(coupons)
    }, [coupons])
    const handleOnColumnSort = ({ key, order }: any) => {
        console.log('Column sort', key, order)
        const dataSorted = [...data].sort((a, b) =>
            order === 'asc' ? a[key] - b[key] : b[key] - a[key]
        )
        setSortBy({ key, order })
        setData([...dataSorted])
    }

    const rowEventHandlers = {
        onClick: handleOnClickRow,
        // onDoubleClick: action('double click'),
        // onContextMenu: action('context menu'),
        // onMouseEnter: action('mouse enter'),
        //  onMouseLeave: action('mouse leave'),
    }

    return (
        <Content>
            <AutoResizer>
                {({ width, height }) => (
                    <BaseTable
                        data={data}
                        loading={loading}
                        width={width}
                        height={height}
                        rowKey="id"
                        headerHeight={45}
                        rowHeight={70}
                        sortBy={sortBy}
                        onColumnSort={handleOnColumnSort}
                        rowEventHandlers={rowEventHandlers}
                        // rowClassName={addClassNameRow(selectedRow)}
                    >
                        {columns.map(({ dataKey, ...rest }: BaseTableProps) => (
                            <Column key={dataKey} dataKey={dataKey} {...rest} />
                        ))}
                    </BaseTable>
                )}
            </AutoResizer>
        </Content>
    )
}

export default CoupunsListTable

function dataTable(dataTable: any) {
    throw new Error('Function not implemented.')
}
