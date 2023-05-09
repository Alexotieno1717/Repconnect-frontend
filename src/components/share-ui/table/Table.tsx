/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ClassAttributes, HTMLAttributes, Key } from 'react';
// @ts-ignore
import {usePagination, useTable} from 'react-table';


// @ts-ignore
const Table = ({columns, data, loading, getTrProps}) => {

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
            <div className="table-responsive">
                <table id="react-table" {...getTableProps()} className="table table-hover">
                    <thead>
                    {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>; headers: any[]; }, index: Key | null | undefined) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} key={index}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row: {
                        getRowProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>;
                        cells: any[];
                    }, i: Key | null | undefined) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={i}>
                                {row.cells.map((cell, i) => {
                                    return <td {...cell.getCellProps()} key={i} className="py-4">{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination  justify-content-center mt-4 mb-1 pb-0">
                        {/* <li className='me-md-auto'>
                  Go to page:{' '}
                  <input
                    type="text"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0
                      gotoPage(page)
                    }}
                    style={{ width: '50px' }}
                    className='input-goto'
                  />
                </li> */}
                        <li className='d-inline-flex me-md-auto'>
                  <span  className='d-flex align-items-center'>
                    Page &nbsp;{' '}
                      <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                  </span>
                        </li>
                        <li className='d-inline-flex me-md-auto'>
                            <span className='d-flex align-items-center'>Show rows &nbsp;</span>{'  '}
                            <select
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value))
                                }}
                                className="form-select" style={{width : '72px'}}>
                                {[10, 20, 30, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li className={`page-item ${!canPreviousPage ? 'disabled' : '' }`}>
                            <button className="page-link page-link-custom rounded-start" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                Start
                            </button>{' '}
                        </li>
                        <li className={`page-item ${!canPreviousPage ? 'disabled' : '' }`}>
                            <button className="page-link page-link-custom"  onClick={() => previousPage()} disabled={!canPreviousPage}>
                                Previous
                            </button>{' '}
                        </li>
                        <li className={`page-item ${!canNextPage ? 'disabled' : '' }`}>
                            <button className="page-link page-link-custom" onClick={() => nextPage()} disabled={!canNextPage}>
                                Next
                            </button>{' '}
                        </li>
                        <li className={`page-item ${!canNextPage ? 'disabled' : '' }`}>
                            <button className="page-link page-link-custom rounded-end" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                End
                            </button>{' '}
                        </li>

                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Table