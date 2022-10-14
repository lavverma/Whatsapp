import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Chat from "./Chat"
import { useState } from "react"
import io from "socket.io-client"

const socket = io.connect("https://whatsappserver-oue4.onrender.com")


const App = () => {
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== '' && roomId !== "") {
      //* emit the event from frontend to backend(1st)
      socket.emit("join_room", roomId)
      setShowChat(true)
    }
  }
  
  return (
    <div className="App container-fluid " >
      {!showChat ? (
        <div className="vh-100"
          style={{ backgroundImage: `url("https://img.freepik.com/free-vector/combination-circuit-head-shape-artificial-intelligence-moral-electronic-world-illustration_456031-123.jpg?w=2000")` }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="card shadow-lg mt-5 bg-info  border border-dark"
              style={{ width: "400px", height: "500px", backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUr5zjx3ETA5RuUKwQxU_p8I6zJdX6wc28eoZu6gvK9R5UzMSlondVgIGumAsPJwx8lQ&usqp=CAU")` }}>
              <div className="card-body p-5 text-center">
                <h2 className=" text-decoration-underline m-5">Join A Chat</h2>
                <input type="text"
                  placeholder="Write your name..."
                  className=" m-3 rounded-3 border border-dark p-1 ps-2"
                  style={{ width: "270px" }}
                  onChange={(event) => { setUserName(event.target.value) }} />
                <input type="text"
                  placeholder="Enter Room ID .."
                  className=" m-3 rounded-3 border border-dark p-1 ps-2"
                  style={{ width: "270px" }}
                  onChange={(event) => { setRoomId(event.target.value) }}
                  onKeyPress={(event) => { event.key === "Enter" && joinRoom() }} />
                <button className=" btn btn-success btn-lg m-3"
                  onClick={joinRoom}>Join Room</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={roomId} />
      )}
    </div>
  );
}

export default App;
