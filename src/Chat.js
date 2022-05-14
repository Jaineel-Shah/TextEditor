import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import './chat.css';
import JoditEditor from "jodit-react";
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
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
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      
      
      
	  <div className="editor">
       
        <div class="container con1">{/* main container*/}
          <div class="row main ">{/*main */}
          
          {/* <div class="text-option "  >
			      <div class="row" >
					    
              <div class="col">
                <div class="row">
                  <div class="col" >
                    <button><i class="fa fa-bold" aria-hidden="true" ></i></button>
                  </div>
                  <div class="col"><button><i class="fa fa-italic" aria-hidden="true"></i></button></div>
                  <div class="col"><button><i class="fa fa-strikethrough" aria-hidden="true"></i></button></div>
                  <div class="col"><div class="v1" ></div></div>
                </div>
					    </div>
              
              <div class="col">
						<div class="row">
							<div class="col" >
            
								<button><i class="fa fa-link" aria-hidden="true"></i></button>
							</div>
							<div class="col"><button><i class="fa fa-list-ol" aria-hidden="true"></i></button></div>
							<div class="col"><button><i class="fa fa-list" aria-hidden="true"></i></button></div>
						</div>
					</div>
              <div class="col c1" >

                <div class="row">
                   <div class="col"><div class="v1" ></div></div>
                  <div class="col"><button><i class="fa fa-code"></i></button></div>
                </div>
              </div>
              <div class="col">
                <div className="row">
                  
                  <div class="col"><button><i class="fa fa-code"></i></button></div>
                </div>
              </div>

            </div>
          </div> */
          <JoditEditor
          // ref={editor}
          value={content}
          config={config}I
         // tabIndex={1} // tabIndex of textarea
          // onBlur={(newContent) => {
          //   // setContent(newContent.target.innerHTML);
          // }}
          //onChange={this.onUpdateContent}
        />}
		  <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
          <div class="chat-footer" > 
            <div class="row r1" >
			<input
          type="text"
		  class="c4"
          value={currentMessage}
          placeholder="Chat Com..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
            
	      	</div>
          <div class="feature-option" >
			      <div class="row">			
              <div class="col c2" >
                <div class="row">
                  <div class="col">
                    <button><i class="fa fa-plus-circle" aria-hidden="true"></i></button>
                </div>
                </div>
              </div>
            
				<div class="col c2">
					<div class="row">
						<div class="col">
							<button><i class="fa fa-at" aria-hidden="true"></i></button>
						</div>

					</div>
				</div>
            </div>
          </div>

            
          </div>{/*close main */}
        </div>{/*close main container */}
      
      </div>
    </div>
	
  );
}

export default Chat;