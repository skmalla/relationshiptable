import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { COLUMNS } from "./KRIRiskColumn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import GlobalFilter from "../../../../UI/TableCommonComponents/GlobalFilter/GlobalFilter";
import "../../KRI.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "../../../../UI/TableCommonComponents/CheckBox/CheckBox";
import Scroll from "../../../../UI/Scrollers/ScrollToTop";
import SliderImg from "../../../../../../images/Slider.png";

const KRIRiskTable = ({ riskTableData }) => {
  const [isColumnFilter, setColumnFilter] = useState(false);

  const handleToggle = () => {
    setColumnFilter(!isColumnFilter);
  };

  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => riskTableData, []);

  const [open, setOpen] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("xl");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCellCheckBox = () => {
    console.log("checked");
  };

  const handleAllCellCheckBox = () => {
    console.log("AllChecked");
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    pageCount,
    selectedFlatRows,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox
                {...getToggleAllRowsSelectedProps()}
                onClick={handleAllCellCheckBox}
              />
            ),
            Cell: ({ row }) => (
              <Checkbox
                {...row.getToggleRowSelectedProps()}
                onClick={handleCellCheckBox}
              />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <p className='panel-heading'>Risk Table</p>
      </div>
      <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <span>
          <i
            class='fa fa-filter'
            onClick={handleToggle}
            style={{ cursor: "pointer", fontSize: "14px", color: "#efa239" }}
            title='Column Filter'
          ></i>
        </span>
        <span
          onClick={handleOpen}
          style={{
            cursor: "pointer",
            marginLeft: "600px",
            fontSize: "14px",
          }}
          className='showHideColumns'
        >
          <img
            src={SliderImg}
            alt='slider'
            style={{ height: "20px" }}
            className='mr-1'
          />
          Show/Hide Columns
        </span>
      </div>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogContent>
          <div>
            <p className='panel-heading'>Show/Hide Columns : Risk Table</p>
            <hr />
            <div className='showHideFieldContainer'>
              <div className='showHideFieldItems'>
                <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
              </div>
              {allColumns.map((column) => (
                <div key={column.id} className='showHideFieldItems'>
                  <Checkbox
                    className='ml-1'
                    {...column.getToggleHiddenProps()}
                  />
                  <label className='ml-2'>{column.Header}</label>
                </div>
              ))}
            </div>
            <hr />
            <div className='text-right mt-2'>
              <button onClick={handleClose} className='other-white-button'>
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className='table-container table-responsive'>
        <Scroll>
          <table {...getTableProps()} id='react-table' className='table'>
            <caption>Risk Table</caption>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span className='ml-2'>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FontAwesomeIcon
                              icon={faArrowDown}
                              className='arrowIcon'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faArrowUp}
                              className='arrowIcon'
                            />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                      {isColumnFilter && (
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className='react-table'>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            <hr />
          </table>
        </Scroll>
      </div>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <div className='text-center mt-2'>
        <span>
          <span>Page{"  "}</span>
          <span>
            {pageIndex + 1} of {pageOptions.length}
          </span>
          {"  "}
        </span>
        <span>
          <span>| Go To Page: </span>
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "40px", borderLeft: "0", fontWeight: "bold" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className='pageDropdown ml-1'
          style={{
            width: "10%",
            height: "1%",
            padding: "1%",
            display: "inline",
            fontWeight: "normal",
          }}
        >
          {[5, 10, 15, 20, 25, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show: {pageSize}
            </option>
          ))}
        </select>
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className='pageBtn ml-1'
        >
          {"<<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className='pageBtn'
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className='pageBtn'
        >
          Next
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className='pageBtn'
        >
          {">>>"}
        </button>
      </div>
    </>
  );
};

export default KRIRiskTable;
