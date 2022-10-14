import React from "react";

const Pagination = ({currentPage, setCurrentPage, loading, pages}) => {
  const separateToArray = (size: number, sliceAtNumber?: number) => {
    const array = Array.from(Array(size).keys()).map(x => x + 1)
    return (sliceAtNumber ? array.slice(array.indexOf(sliceAtNumber)) : array)
  }

  const pageList = () => {
    const paginatePages = separateToArray(pages)

    if (pages < 6) return paginatePages

    const paddingSize = 3
    if (currentPage <= paddingSize*2) {
      return separateToArray(currentPage + paddingSize).concat(['...', pages])
    }

    let paginateList = [1, '...']
    const sliceAtNumber = currentPage - paddingSize
    if ((pages - currentPage) <= 6) return paginateList.concat(separateToArray(pages, sliceAtNumber))

    return paginateList.concat(separateToArray(currentPage + paddingSize, sliceAtNumber)).concat(['...', pages])
  }

  return (
    <>
      <li className={`page-item ${loading ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#" aria-label="Previous"
          onClick={() => { if (currentPage > 1) {setCurrentPage(currentPage - 1)}}}
        >
          <span aria-hidden="true">Previous</span>
        </a>
      </li>
      {
        pageList().map((pageValue, index) => {
          return (
            <li className={`page-item ${loading ? "disabled" : ""}`} key={index}>
              <a
                className={`page-link shadow-none ${currentPage === pageValue ? "active" : ""}`}
                href="#"
                onClick={() => {
                  if (Number.isInteger(pageValue)) setCurrentPage(pageValue)
                }}
              >
                {pageValue}
              </a>
            </li>
          )
        })
      }
      <li className={`page-item ${loading ? "disabled" : ""}`}>
        <a
          className="page-link"
          href="#"
          aria-label="Next"
          onClick={() => { if (currentPage < pages) {setCurrentPage(currentPage + 1)}}}>
          <span aria-hidden="true">Next</span>
        </a>
      </li>
    </>
  )
}

export default Pagination
