// Import necessary packages
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Button from '@/components/base/Button';
import { BiMessage } from 'react-icons/bi';
import { useAblyChannel } from '@/hooks/useAblyChannel';

interface ChatBubbleProps {
  text: string;
}

function ChatBubble({ text }: ChatBubbleProps) {
  return (
    <div
      className={classNames(
        `flex justify-between items-center mb-2 px-4 py-2 rounded-lg text-slate-200 border border-slate-200/10 bg-slate-700`,
      )}
    >
      {text}
    </div>
  );
}

export default function ChatBar() {
  const { messages, sendMessage } = useAblyChannel('chat');
  const [messageText, setMessageText] = useState(''); // textarea value

  const handleSend = () => {
    sendMessage(messageText); // Send the text when the button is clicked
    setMessageText(''); // Clear the text
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Check if Enter was pressed without Shift
      event.preventDefault(); // Prevent a new line from being created in the textarea
      handleSend();
    }
  };

  return (
    <div
      className={`h-screen px-2 pb-2 w-192 bg-slate-700 flex flex-col justify-between`}
    >
      <div
        className={`h-9/10 flex flex-col items-end overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded py-2 pr-2`}
      >
        {messages.map((el, index) => (
          <ChatBubble key={index} text={el.data} />
        ))}
      </div>
      <div className="flex flex-col items-end h-1/10">
        <Button
          className={`w-fit mb-2 flex`}
          rounded={true}
          onClick={() => handleSend()}
        >
          <BiMessage className="w-6 h-6 mr-4" />
          Send Message
        </Button>
        <textarea
          className="w-full px-4 py-2 text-2xl border rounded-lg h-36 text-slate-200 bg-slate-700 border-slate-200/10"
          placeholder="Type your message here..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
