import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import ScrollToBottom from 'react-scroll-to-bottom'
import './Chat.css'
import React, { useEffect, useState } from 'react'

function Chat({ socket, userName, room }) {
  const [currMessage, setCurrMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    if (currMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      //* emit the content from frontend to backend (2nd)
      await socket.emit("sendMessage", messageData)
      setMessageList((list) => [...list, messageData])

      setCurrMessage("")  //*agin set current message is empty

      document.getElementById("input").value = ''  //* set input message tag again after firing the event

    }
  }

  useEffect(() => {
    //* listening the emit content from backend at frontend
    socket.on("receiveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="Chat">
      <div className=" vh-100 container-fluid" style={{ backgroundImage: `url("https://e7.pngegg.com/pngimages/598/1005/png-transparent-abstract-background-technology-hexagonal-pattern.png")` }}>
        <div class="row d-flex justify-content-center align-items-center h-100" >
          <div className="card shadow-lg mx-auto border border-dark w-50"
            style={{  backgroundImage: `url("https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg")` }}>
            <div className='chat-header card-header bg-success' >
              <p className="text-center h1 text-white" >Live Chats</p>
            </div>
            <div id="scroll" className='chat-message card-body'>
              <div style={{ height: "350px" }}>
                <ScrollToBottom className="message-container">
                  {messageList.map((messageContent) => {
                    return (
                      <div>
                        {(userName === messageContent.author) ? (
                            <div class=" d-flex flex-row-reverse " >
                              <div className="lh-1">
                                <div className="rounded-4 fw-normal m-2 p-2 border border-dark "
                                  style={{ backgroundColor: "#DCF8C6" }}>
                                  <p >
                                    <span className="fw-bold ">{messageContent.message}</span>
                                    <span className="fw-lighter fst-italic d-flex flex-row-reverse">{messageContent.time}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                        ) : (
                            <div class=" d-flex flex-row " >
                              <div className="lh-1">
                                <div className=" rounded-4 fw-normal m-2 p-2  border border-dark"
                                  style={{ backgroundColor: "#ECE5DD" }}>
                                  <p className="fw-bold fst-italic text-success">
                                    {messageContent.author}
                                  </p>
                                  <p >
                                    <span className="fw-bold ">{messageContent.message}</span>
                                    <span className="fw-lighter fst-italic d-flex flex-row-reverse">{messageContent.time}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                        )}
                      </div>
                    )
                  })}
                </ScrollToBottom>
              </div>
            </div>
            <div className='chat-footer card-footer'>
              <div className="row">
              <input type="text"
                id="input"
                placeholder='Write your message...'
                className="rounded-3 me-2 p-2 col-10" 
                onChange={(event) => { setCurrMessage(event.target.value) }}
                onKeyPress={(event) => { event.key === "Enter" && sendMessage() }} />
              <button onClick={sendMessage} className="col-1">&#10148;</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat