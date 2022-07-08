import { dateComparator } from 'util/date';

const ColumnDefs = [
    {
        field: 'createdAt', 
        headerName: 'Created At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.createdAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.createdAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    {
        field: 'updatedAt', 
        headerName: 'Updated At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.updatedAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.updatedAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    { 
        field: 'amount', 
        headerName: 'Amount', 
        editable: true, sortable: true, 
        filter: 'agNumberColumnFilter'
    },
    { 
        field: 'name', 
        headerName: 'Name', 
        editable: true, 
        sortable: true, 
        filter: 'agTextColumnFilter' 
    },    
    { 
        field: 'color', 
        headerName: 'Color', 
        sortable: true 
    }
];

export default ColumnDefs;