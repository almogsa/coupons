import BaseTable, { Column } from 'react-base-table'
import { DeleteIconRed } from '../../styles/Styles'
import Types from '../../components/Table/types'
import { Type } from '../../components/Table/style'
import DeleteCoupon from '../../components/DeleteCoupon'

export default [
    {
        dataKey: 'id',
        title: 'id',
        width: 100,
        sortable: true,
        align: 'center',
    },
    {
        dataKey: 'type',
        title: 'Type',
        width: 100,
        sortable: true,
        cellRenderer: ({ cellData }) => <Type type={cellData}>{cellData}</Type>,
    },
    {
        dataKey: 'name',
        title: 'Name',
        width: 110,
    },
    {
        dataKey: 'code',
        title: 'code',
        width: 110,
    },

    // {
    //     dataKey: 'description',
    //     title: 'desc',
    //     width: 60,
    //     sortable: true,
    // },

    {
        dataKey: 'discountedPrice',
        title: 'discountedPrice',
        width: 100,
        sortable: true,
    },
    {
        dataKey: 'regularPrice',
        title: 'regularPrice',
        width: 150,
        sortable: true,
    },
    {
        dataKey: 'dueDate',
        title: 'dueDate',
        width: 100,
        sortable: true,
    },
    // {
    //   dataKey: 'timestamp',
    //   title: 'timestamp',
    //   width: 150,
    //   sortable: true
    // },
    //   {
    //       dataKey: 'link',
    //       title: 'link',
    //       width: 120,
    //       sortable: true,
    //   },
    {
        dataKey: 'action',
        title: 'Action',
        width: 120,
        sortable: true,
        align: Column.Alignment.CENTER,
        frozen: Column.FrozenDirection.RIGHT,
        cellRenderer: ({ rowData }) => (
            <DeleteCoupon cellData={rowData}></DeleteCoupon>
        ),
    },
]
