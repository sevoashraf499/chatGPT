import MessagesList from "../MessagesList/MessagesList";
import MessageInput from "../MessageInput/MessageInput";
import "./styles/App.css";

import { useState } from "react";

function App() {
  const [messagesList, setMessagesList] = useState([
    {
      role: "assistant",
      content: "Hello, I'm chatGPT! How can I help you?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="chat-container">
      <MessagesList messagesList={messagesList} isTyping={isTyping} />
      <MessageInput
        messagesList={messagesList}
        setMessagesList={setMessagesList}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
      />
    </div>
  );
}

export default App;
