import React, { useState } from "react";
import axios from "axios";
import yarn from "../assets/yarn.png"
import { ReactTyped } from "react-typed";
import user from "../assets/user.png"
import bot from "../assets/bot.png"


function Chatbot() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);



  const sentences = [
        "That is a great choice. I will provide you with sustainability steps so that the product is made with good quality.👕",
        "Nice one, the fabric that you have chosen has high durability. However I will provide you with some sustainable methods so that the product is made with good quality.♻️",
        "Great pick! I’ll guide you with sustainable steps to ensure the product is made responsibly.👗",
        "Nice choice! That material works well—I'll help you make it even more sustainable.👕",
        "That's an excellent fabric selection. Let me suggest eco-friendly ways to improve its quality.🧣",
        "Wonderful choice! Let’s explore some sustainable practices you can follow during production.🪢",
        "Good one! This fabric already performs well—I can help you enhance its sustainability.🧵",
        "Nice selection. I'll share a few steps to make your product environmentally responsible.👍",
        "That’s a solid pick! I'll give you sustainability tips to ensure the final product lasts long.🌿",
        "Great fabric! I’ll suggest a few green methods to help you make it more eco-friendly.👜",
        "Good choice! With a few sustainable practices, you can improve both quality and durability.✨",
        "Nice fabric selection! Let me help you apply sustainability techniques for better results.😊",
        "That's a high-quality material. I'll give you some tips to keep your process sustainable.🪡",
        "Excellent choice! I’ll guide you through eco-friendly steps to ensure responsible production.👕",
        "This is a durable option. I’ll help you improve its sustainability during manufacturing.🧶",
        "Great selection! Let’s make your product high-quality and planet-friendly with these tips.🪢",
        "Nice pick! I'll recommend sustainable measures that will improve the product’s overall performance.🧵"
    ]



    const getRandomSentence = () => {
  return sentences[Math.floor(Math.random() * sentences.length)];
};

  const askQuestion = async () => {
    if (!input.trim()) return;

    const payload = {
        user_input : input
    }

      // Add the user's message to chat first
setResults((prev) => [
  ...prev,
  { type: "user", text: input }
]);

    const response = await axios.post(
      "http://localhost:8000/suggestion",
      payload,
      {
        headers: { "Content-Type": "application/json"  }
      }
    );

  setResults((prev) => [
  ...prev,
  ...response.data.map(item => ({
    type: "bot",
    text: item.Suggestion,
    Fabric: item.Fabric,
    randomSentence: getRandomSentence()
  }))
]);
setInput("");
  };

  const resetConversation = () => {
    setResults([]);
  }

  return (
<div className="bg-white min-h-screen flex flex-col items-center">

  {/* Title */}
  <div className="bg-black w-full text-amber-50">
  <h1 className="text-xl font-semibold py-6 ml-4">Fabric Sustainability Advisor</h1>
  </div>

<div className="w-full max-w-7xl flex-1 overflow-y-auto px-4 py-6 rounded-lg mt-5 mb-24 max-h-[700px]">
  
  {results.length === 0 && (


<>
  <style>
  {`
    @keyframes float {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-40px); }
      100% { transform: translateY(0px); }
    }

  `}
  </style>

    <div className="flex flex-col justify-center w-full items-center h-[600px]">
    <img src = {yarn} alt="" className="w-120 animate-[float_3s_ease-in-out_infinite]"/>

<ReactTyped
  className="text-3xl font-bold"
  strings={[
    "Ask me about a fabric and I will help you with sustainable practices",
  ]}
  typeSpeed={40}
  backSpeed={30}
  loop
/>

    </div>
    </>
  )}

 {results.map((msg, index) => (
  <div
    key={index}
    className={`flex w-full mb-4 ${
      msg.type === "user" ? "justify-end" : "justify-start"
    }`}
  >
     <img
        src={msg.type === "user" ? user : bot}
        alt=""
        className="w-8 h-8 rounded-full mr-5 mt-2"
      />
    <div
      className={`max-w-md px-4 py-3 rounded-lg shadow ${
        msg.type === "user"
          ? "bg-black text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      {/* Show random sentence only for bot messages */}
      {msg.type === "bot" && msg.randomSentence && (
        <>
        <p>So, you have chosen <strong>{msg.Fabric}</strong> for your product!</p>
        <p className="mb-2 font-medium">{msg.randomSentence}</p>
        </>
      )}

      {/* BOT MESSAGE → Render bullet points */}
      {msg.type === "bot" ? (
        <ul className="list-disc pl-5 space-y-1">
          {msg.text
            .split("•")
            .map((item, i) => item.trim() && <li key={i}>{item.trim()}</li>)}
        </ul>
      ) : (
        /* USER MESSAGE → Render normally */
        <>
        <p>{msg.text}</p>
       </>
      )}
    </div>
  </div>
))}

</div>


  {/* Input box */}
  <div className="
  fixed bottom-10 w-full max-w-7xl flex bg-white py-4 gap-5 
  ">
    <input
      className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
      placeholder="Ask something like for example : 'cotton', 'wool' or 'suggest some sustainable techniques for cotton...'"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

    <button
      className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
      onClick={askQuestion}
    >
      Get Suggestions
    </button>
    <button
     className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
      onClick={resetConversation}
    >
       reset
    </button>
  </div>
</div>



  );
}

export default Chatbot;
