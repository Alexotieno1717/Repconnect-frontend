/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ClassAttributes, HTMLAttributes, Key } from 'react';
// @ts-ignore
import {usePagination, useTable} from 'react-table';


// @ts-ignore
interface TableProps {
    className: unknown
}

// @ts-ignore
const Table = ({ columns, data, loading }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,// Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable({
            columns, data, initialState: {pageIndex: 0}
        },
        usePagination
    )

    // loader
    if (loading === true && !data) {
        // return <Spinner color="blue"/>
        return <p>Loading</p>
    }

    // empty state 
    if (!loading && data?.length < 1) {
        // return <EmptyState/>;
        return <p>No Records Found</p>
    }


    return (
        <>
            {loading && (
                <p>Loading......</p>
            )}
            <div className="flex flex-col overflow-x-auto">
                <table id="react-table" {...getTableProps()} className="min-w-full divide-y divide-bodydark2">
                    <thead>
                    {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>; headers: any[]; }, index: Key | null | undefined) => (
                        <tr
                            className='sm:table-row'
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    scope='col'
                                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                    {...column.getHeaderProps()} key={index}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody
                        {...getTableBodyProps()}
                        className="bg-white divide-y divide-meta-2"
                    >
                    {page.map((row: {
                        getRowProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>;
                        cells: any[];
                    }, i: Key | null | undefined) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell, i) => {
                                    return <td
                                        {...cell.getCellProps()} key={i}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="py-3 flex items-center justify-between">
                        <li className=''>
                          <span  className='text-sm text-black'>
                            Page &nbsp;{' '}
                              <strong>
                              {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                          </span>
                        </li>
                        <li className=''>
                            <span className=''>Show rows &nbsp;</span>{'  '}
                            <select
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                                style={{width : '72px'}}>
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <div className='flex justify-between'>
                            <li className={`text-primary ${!canPreviousPage ? 'text-bodydark' : '' }`}>
                                <button className="" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    Start
                                </button>{' '}
                            </li>
                            <li className={`page-item ${!canPreviousPage ? 'text-bodydark' : '' }`}>
                                <button className="pl-3"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    Previous
                                </button>{' '}
                            </li>
                            <li className={`page-item ${!canNextPage ? 'text-bodydark' : '' }`}>
                                <button className="pl-3" onClick={() => nextPage()} disabled={!canNextPage}>
                                    Next
                                </button>{' '}
                            </li>
                            <li className={`page-item ${!canNextPage ? 'text-bodydark' : '' }`}>
                                <button className="pl-3" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    End
                                </button>{' '}
                            </li>
                        </div>

                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Table