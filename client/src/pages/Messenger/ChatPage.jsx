import React from "react";
import "./Messenger.css";  

import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/Message";
import CustomButton from "../../components/CustomButton";

const ChatPage = () => {
  return (
   <>
   <div className="container mx-auto mt-16 py-16 min-h-screen">
      <div className="p-12 bg-white rounded-lg shadow">
        <div className="Messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder=" Buscar vendedores" className="chatMenuInput" />
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              </div> 
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
             <div className="chatBoxTop">
              <Message/>
              <Message own={true}/>
              <Message/>
             </div>
             <div className="chatBoxBottom">
              <textarea className="chatMessageInput" placeholder=" Escriba un nuevo mensaje... "></textarea>
              <button className="chatSubmitButton" >Enviar</button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatPage;
