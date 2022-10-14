import React, {useEffect, useState} from "react";
import useAPI from "../../utils/callAPI";
import "./Contacts.scss";
import Pagination from "../../components/Pagination/Pagination";

const Contacts = () => {
  const [page, setPage] = useState(1)
  const { callAPI, loading, response } = useAPI({
    method: 'get',
    query: { page: page },
    path: '/api/v1/contacts',
  })

  useEffect(() => {
    callAPI()
  }, [page])

  return (
    <>
      <main id="main">
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>contacts</h2>
            </div>
          </div>
        </section>
        <div className="row justify-content-center">
          <div className="col-10">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                { response && response.data.map((contact, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{contact.id}</th>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="row">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  { response &&
                      <Pagination
                          currentPage={page}
                          setCurrentPage={setPage}
                          loading={loading}
                          pages={response.pagination.pages} />}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Contacts
