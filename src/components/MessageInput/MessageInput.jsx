import "./styles/MessageInput.css";
import { useState } from "react";
import { SendOutline } from "react-ionicons";

export default function MessageInput({
  messagesList,
  setMessagesList,
  isTyping,
  setIsTyping,
}) {
  const [inputValue, setInputValue] = useState("");

  // handle submit function
  function handleSubmit() {
    // validate input
    if (!inputValue || isTyping) {
      return;
    }

    // update our messages list
    setMessagesList((prevList) => [
      ...prevList,
      { role: "user", content: inputValue },
    ]);

    // create a type indicator
    setIsTyping(true);

    // send it to chatGPT & get respond
    sendMessageAndGetRespond();
  }

  // create message to send with the request
  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [...messagesList, { role: "user", content: inputValue }],
  };

  async function sendMessageAndGetRespond() {
    setInputValue("");

    await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessagesList((prevList) => [
          ...prevList,
          {
            role: data.choices[0].message.role,
            content: data.choices[0].message.content,
          },
        ]);

        setIsTyping(false);
      });
  }

  return (
    <div className="message-input">
      <textarea
        autoFocus
        conteneditable="true"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>

      <span>
        <SendOutline
          style={{
            color: "white",
          }}
          onClick={handleSubmit}
        />
      </span>
    </div>
  );
}
