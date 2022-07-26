import React from 'react'
import default_profile from "../../assets/img/blank-profile.png"

const Chat = ({ contact, user, messages, sendMessages }) => {
  console.log(messages);
    return (
        <>
        {contact ? (
          <>
            <div id="chat-messages" style={{ height: "80vh" }} className="overflow-auto px-3 py-2">
            {messages.map((item, index) => (
                <div key={index}>
                  <div className={`d-flex py-1 ${item?.idSender === user.id ? "justify-content-end": "justify-content-start"}`}>
                    {item.idSender !== user.id && (
                      <img src={contact?.image || default_profile} className="rounded-circle me-2 img-chat" alt="bubble avatar" />
                    )}
                    <div
                      className={ item.idSender === user.id ? "chat-me" : "chat-other"}
                    >
                      {item?.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: '6vh' }}className="px-3">
              <input 
                placeholder="Send Message" 
                className="input-message px-4" 
                onKeyPress={sendMessages} />
            </div>
          </>
        ) : (
          <div
            style={{ height: "89.5vh" }}
            className="h4 d-flex justify-content-center align-items-center"
          >
            No Message
          </div>
        )}
      </>
    )
}

export default Chat