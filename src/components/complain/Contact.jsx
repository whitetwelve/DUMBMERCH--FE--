import React from 'react'
import default_profile from "../../assets/img/blank-profile.png"
import "../../assets/css/Complain.css"


const Contact = ({ dataContact, clickContact, contact }) => {
    return (
        <div className="mt-5">
        {dataContact.length > 0 && (
          <div>
            {dataContact.map((item, index) => (
              <div
                key={index}
                className={`contact mt-3 p-2 ${
                  contact?.id === item?.id && "contact-active"
                }`}
                onClick={() => {
                  clickContact(item);
                }}
              >
                <img
                  src={ item?.profile?.image ? `http://localhost:5000/uploads/` +
                   item?.profile?.image : default_profile}
                  className="rounded-circle me-2 img-contact"
                  alt="user avatar"
                />
                <div className="ps-1 text-contact d-flex flex-column justify-content-around">
                  <p className="mb-0">{item.name}</p>
                  <p className="text-contact-chat mt-1 mb-0">
                    {item?.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}

export default Contact