// React/Next imports
import React, { useState } from 'react';

// Component imports
import Button from '@/components/base/Button';
import { useAblyChannel } from '@/hooks/useAblyChannel';

// Other imports
import classNames from 'classnames';
import { BiMessage } from 'react-icons/bi';

interface ChatBubbleProps {
  userId: string;
  text: string;
}

function ChatBubble({ userId, text }: ChatBubbleProps) {
  return (
    <div
      className={classNames(
        ` mb-2 px-4 py-2 rounded-lg text-slate-200 border border-slate-200/10 bg-slate-700`,
      )}
    >
      <span className="mr-2 font-semibold text-cyan-500">{userId}:</span>
      {text}
    </div>
  );
}

export default function ChatBar() {
  const { messages, sendMessage } = useAblyChannel('chat');
  const [messageText, setMessageText] = useState('');

  const rollDie = (sides: number) => Math.floor(Math.random() * sides) + 1;

  const rollDice = (count: number, sides: number) => {
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(rollDie(sides));
    }
    return rolls;
  };

  const handleDiceRoll = (text: string) => {
    const isDiceRollCommand = text.startsWith('/roll');
    if (isDiceRollCommand) {
      const commandParts = text.split(' ')[1]?.split('+');
      const totalResults: number[] = [];
      const rollDetails: string[] = [];

      for (const part of commandParts) {
        if (part.includes('d')) {
          const [count, sides] = part.split('d').map((n) => parseInt(n));
          const rolls = rollDice(count, sides);
          const rollSum = rolls.reduce((a, b) => a + b, 0);
          totalResults.push(rollSum);
          rollDetails.push(`${count}d${sides} (${rolls.join(', ')})`);
        } else {
          const value = parseInt(part);
          totalResults.push(value);
          rollDetails.push(value.toString());
        }
      }

      const result = totalResults.reduce((a, b) => a + b, 0);
      const details = `${commandParts.join(
        ' + ',
      )} = ${result} (${rollDetails.join(', ')})`;
      sendMessage(`Dice roll result: ${result}`);
      sendMessage(details);
    } else {
      sendMessage(text);
    }
  };

  const handleSend = () => {
    handleDiceRoll(messageText);
    setMessageText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen px-2 pb-2 w-192 bg-slate-700">
      <div className="flex flex-col items-end py-2 pr-2 overflow-y-auto h-9/10 scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded">
        {messages.map(
          (el, index) => (
            console.log('el', el),
            (
              <ChatBubble
                key={index}
                userId={el.clientId}
                text={`${el.data}`}
              />
            )
          ),
        )}
      </div>
      <div className="flex flex-col items-end h-1/10">
        <textarea
          className="w-full px-4 py-2 text-2xl border rounded-lg h-36 text-slate-200 bg-slate-700 border-slate-200/10"
          placeholder="Type your message here..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="flex mt-2 w-fit"
          rounded={true}
          onClick={() => handleSend()}
        >
          <BiMessage className="w-6 h-6 mr-4" />
          Send Message
        </Button>
      </div>
    </div>
  );
}

// // React/Next imports
// import React, { useState, useEffect } from 'react';

// // Component imports
// import Button from '@/components/base/Button';
// import DiceRoller from '@/components/DiceRoller';
// import { useAblyChannel } from '@/hooks/useAblyChannel';

// // Other imports
// import classNames from 'classnames';
// import { BiMessage } from 'react-icons/bi';

// interface ChatBubbleProps {
//   text: string;
// }

// function ChatBubble({ text }: ChatBubbleProps) {
//   return (
//     <div
//       className={classNames(
//         `flex justify-between items-center mb-2 px-4 py-2 rounded-lg text-slate-200 border border-slate-200/10 bg-slate-700`,
//       )}
//     >
//       {text}
//     </div>
//   );
// }

// export default function ChatBar() {
//   const { messages, sendMessage } = useAblyChannel('chat');
//   const [messageText, setMessageText] = useState(''); // textarea value

//   const handleSend = () => {
//     sendMessage(messageText); // Send the text when the button is clicked
//     setMessageText(''); // Clear the text
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       // Check if Enter was pressed without Shift
//       event.preventDefault(); // Prevent a new line from being created in the textarea
//       handleSend();
//     }
//   };

//   return (
//     <div
//       className={`h-screen px-2 pb-2 w-192 bg-slate-700 flex flex-col justify-between`}
//     >
//       <div
//         className={`h-9/10 flex flex-col items-end overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded py-2 pr-2`}
//       >
//         {messages.map((el, index) => (
//           <ChatBubble key={index} text={el.data} />
//         ))}
//       </div>
//       <div className="flex flex-col items-end h-1/10">
//         <DiceRoller />
//         <textarea
//           className="w-full px-4 py-2 text-2xl border rounded-lg h-36 text-slate-200 bg-slate-700 border-slate-200/10"
//           placeholder="Type your message here..."
//           value={messageText}
//           onChange={(e) => setMessageText(e.target.value)}
//           onKeyDown={handleKeyDown}
//         />
//         <Button
//           className={`w-fit mt-2 flex`}
//           rounded={true}
//           onClick={() => handleSend()}
//         >
//           <BiMessage className="w-6 h-6 mr-4" />
//           Send Message
//         </Button>
//       </div>
//     </div>
//   );
// }
