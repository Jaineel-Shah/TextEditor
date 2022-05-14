
import React, {  useState,useRef } from "react";
import './App.css';
import Editor from "./Editor"; 
import pic from "./images/logo.jpg";
import io from "socket.io-client";
 // import Chat from './Chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Chat1 from './Chat1';
import JoditEditor from "jodit-react";
// import { useHistory } from "react-router-dom"

const socket =io.connect("http://localhost:3002");

function App() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config =  {
    readonly: false,
    minHeight: 500,
    style: {
    //  background: '#27272E',
      color: 'white'
  },
  theme : 'dark' 
};
const handleChange = (newContent) => {
  setContent(newContent);
};
// onUpdateContent = (value) => {
//   this.props.dispatch(contentChange(value));
// };
  
  const [username,setUsername]=React.useState("");
  const [room,setRoom]=React.useState("");
  const [showChat,setShowChat]=React.useState(true);
  const [showBody,setShowBody]=React.useState(true);
 // const history = useHistory();

  const joinRoom= ()=>{
    if (username!== ""&& room!==""){
      socket.emit("join_room",room);
      setShowChat(false);
      setShowBody(false);
    }
  };


  return (
    
		<table class="login_block">
			<tr>
        {showChat ? (<tr>
				<td>
					<div class="login_block_1">
            <img src={pic} className="img" alt="chatimage"/>
					</div>
				</td>
        </tr> ): (<tr></tr>)}
				<td>
					<div>
          {showBody? (
            <div className="login_block_2">
						<table class="login_block_2_t1 input-icons">
								<h2 >Welcome To Chat Application</h2>
								<h2 >Join a room</h2>
							<tr>
								<td><i class="fa fa-user icon" id="user"></i>
                <input
          type="text" className="input_field"
          placeholder="     Name..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
       </td>
							</tr>
							<tr>
								<td><i class="fa fa-unlock-alt icon"></i> <input
          type="text" className="input_field"
          placeholder="     Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        /></td>
							</tr>
							<tr>
								<td> <button onClick={joinRoom}class="btn">Join A Room</button></td>
                
							</tr>
						</table>	
            </div>
 ) : (
 // <Chat socket={socket} username={username} room={room} />
  //<h1>chat window</h1>
  <JoditEditor
  // ref={editor}
 // value={content}
  config={config}I
 // tabIndex={1} // tabIndex of textarea
  // onBlur={(newContent) => {
  //   console.log(newContent);
  //    setContent(newContent.target.innerHTML);
  // }}
 // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    //   onChange={newContent => {}}
/>
)}
					</div>
				</td>
			</tr>
		</table>
     );
    }
export default App;