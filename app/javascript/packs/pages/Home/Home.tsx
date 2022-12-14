import React, {useEffect, useState} from "react";
import './Home.scss'
import useAPI from "../../utils/callAPI";

interface Contact {
  name: string,
  email: string,
  subject: string,
  message: string,
}

const defautContact = {
  name: '',
  email: '',
  subject: '',
  message: '',
}
const Home = () => {
  const [contact, setContact] = useState<Contact>(defautContact)

  const { callAPI, response, errResponse } = useAPI({
    path: '/api/v1/contacts',
    method: 'post',
    body: {
      contact: contact
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()

    callAPI();
  }

  useEffect(() => {
    if (response) setContact(defautContact)
    if (errResponse) console.log('err', errResponse.response.data)
  }, [response, errResponse])

  return (
    <>
      <main id="main">
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
    
            <div className="section-title">
              <h2>Contact</h2>
              <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
            </div>
            <div className="row">
    
              <div className="col-lg-5 d-flex align-items-stretch">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
    
                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>
    
                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>
                </div>
    
              </div>
    
              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <form onSubmit={onSubmit} role="form" className="php-email-form">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Your Name</label>
                      <input
                        name="name" className="form-control" id="name"
                        value={contact?.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Your Email</label>
                      <input
                        className="form-control" name="email" id="email"
                        value={contact?.email}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      className="form-control" name="subject" id="subject"
                      value={contact?.subject}
                      onChange={(e) => setContact({...contact, subject: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control" name="message" id="message" rows={10}
                      value={contact?.message}
                      onChange={(e) => setContact({...contact, message: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div className="text-center"><button type="submit">Send Message</button></div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
