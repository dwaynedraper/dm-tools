import React, { useState } from 'react';
import styles from '@/styles/ChatBox.module.scss';

interface ChatBubbleProps {
  text: string;
}

function ChatBubble({ text }) {
  return <div className={`${styles.contextItem}`}>{text}</div>;
}

interface ChatBarProps {
  children: React.ReactNode;
}

const chatLog = [
  'Real-time Serverless Websocket Chat Placeholder',
  'Bacon ipsum dolor amet chicken nostrud consequat pork chop, occaecat ribeye tri-tip bacon pariatur ea ullamco aute swine. Short loin turducken kevin, ut eiusmod pork chop lorem officia in. Ball tip ullamco landjaeger incididunt mollit ut do sausage kielbasa chuck turducken. Ullamco mollit pork tail rump ball tip veniam kielbasa lorem velit. Landjaeger ea sunt id duis burgdoggen ribeye spare ribs flank. Venison pig filet mignon proident chicken fatback laboris exercitation elit in magna short ribs ut. Esse ground round magna, boudin adipisicing salami sunt buffalo ad consequat pariatur.',
  'Pork chop est picanha sausage. Magna bacon aliquip, jowl eu qui eiusmod ham duis nisi cow aute elit jerky swine. Laborum pig labore ut shoulder swine culpa tail veniam tongue. Rump nulla tongue, laboris short loin andouille beef deserunt beef ribs consectetur drumstick pork loin salami. Nisi ham hock nostrud flank pastrami aliquip pork loin, labore leberkas voluptate buffalo qui veniam pork. Officia eiusmod chislic sausage shankle porchetta. Cillum elit officia est, buffalo tempor landjaeger sed id nostrud.',
  'Ipsum pariatur rump bacon quis anim proident eu sunt turkey. Picanha qui ham hock, in ground round cillum bresaola. Pork belly nulla deserunt alcatra buffalo brisket. Porchetta ham hock ball tip chuck adipisicing ut aute ex beef ribs. Non sirloin elit chuck, velit dolore pork. Jowl buffalo landjaeger tri-tip pork chop mollit.',
  'Duis rump ut beef ribs. Strip steak ex kielbasa et occaecat t-bone laboris turkey veniam. Duis pork chop landjaeger anim kielbasa. Eu aliqua ut, esse minim hamburger sausage meatloaf reprehenderit in t-bone. Turducken pariatur ad, in consequat bacon esse chuck tail labore. Pig ullamco consectetur dolor aliquip sirloin. Pork loin nulla shank burgdoggen ipsum frankfurter fugiat salami pancetta reprehenderit ball tip ham picanha beef ribs eu.',
  'Flank aute qui short loin irure fugiat nulla pork chop non sunt. Turducken filet mignon adipisicing, magna leberkas exercitation meatloaf quis pancetta alcatra jowl nostrud laborum. Aliqua quis consequat porchetta pastrami, ground round boudin sunt brisket cillum et jowl.',
  'Real-time Serverless Websocket Chat Placeholder',
];

export default function ChatBar() {
  return (
    <div className={`h-screen px-2 w-192 bg-slate-800`}>
      <div
        className={`h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-700 scrollbar-thumb-cyan-700 scrollbar-thumb-rounded py-2 pr-2`}
      >
        {chatLog.map((el, index) => {
          return <ChatBubble key={index} text={el} />;
        })}
      </div>
    </div>
  );
}
