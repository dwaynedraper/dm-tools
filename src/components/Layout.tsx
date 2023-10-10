// React/Next imports
import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Cinzel_Decorative,
  Kaushan_Script,
  Quintessential,
} from 'next/font/google';

// Component imports
import styles from '@/styles/Layout.module.scss';

// Other imports

import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { IoEarthOutline } from 'react-icons/io5';
import { LiaDiceD20Solid } from 'react-icons/lia';
import { RxDashboard } from 'react-icons/rx';

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['400'] });
const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({
  weight: '400',
  subsets: ['latin'],
});

//Register GSAP plugins
gsap.registerPlugin();

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RxDashboard, current: false },
  {
    name: 'Tracker',
    href: '/tracker',
    icon: BsLayoutTextSidebarReverse,
    current: false,
  },
  {
    name: 'World Builder',
    href: '/world',
    icon: IoEarthOutline,
    current: false,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactElement {
  const boxRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contextBarOpen, setContextBarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="flex w-full h-screen" ref={boxRef}>
      <div className={sidebarOpen ? `${styles.sidebar}` : `${styles.sidebar}`}>
        <div
          onClick={toggleSidebar}
          className="flex flex-col h-full px-6 pb-4 overflow-y-auto grow gap-y-5 bg-slate-900 ring-1 ring-white/10"
        >
          <div className="z-10 flex flex-col items-center border-b shrink-0 border-cyan-700">
            <LiaDiceD20Solid className="w-12 h-12 text-cyan-500" />
            {sidebarOpen && (
              <>
                <p className={`text-5xl text-cyan-500 ${kaushan.className}`}>
                  Initiative
                </p>
                <p
                  className={`mb-8 text-5xl text-cyan-500 ${kaushan.className}`}
                >
                  Tracker
                </p>{' '}
              </>
            )}
          </div>
          <nav className="flex flex-col flex-1">
            <ul
              role="list"
              className={classNames(`flex flex-1 flex-col gap-y-7`, {
                'items-center': !sidebarOpen,
              })}
            >
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center',
                        )}
                      >
                        <item.icon
                          className="w-8 h-8 shrink-0"
                          aria-hidden="true"
                        />
                        {sidebarOpen && item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <a
                  href="#"
                  className="flex items-center p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon
                    className="w-8 h-8 shrink-0"
                    aria-hidden="true"
                  />
                  {sidebarOpen && 'Settings'}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={`h-screen px-2 w-192 bg-slate-800`}>
        <div className={`h-full overflow-y-scroll hide-scrollbar py-2 pr-2`}>
          <div className={`${styles.contextItem}`}>
            Real-time Serverless Websocket Chat Placeholder
          </div>

          <div className={`${styles.contextItem}`}>
            Bacon ipsum dolor amet chicken nostrud consequat pork chop, occaecat
            ribeye tri-tip bacon pariatur ea ullamco aute swine. Short loin
            turducken kevin, ut eiusmod pork chop lorem officia in. Ball tip
            ullamco landjaeger incididunt mollit ut do sausage kielbasa chuck
            turducken. Ullamco mollit pork tail rump ball tip veniam kielbasa
            lorem velit. Landjaeger ea sunt id duis burgdoggen ribeye spare ribs
            flank. Venison pig filet mignon proident chicken fatback laboris
            exercitation elit in magna short ribs ut. Esse ground round magna,
            boudin adipisicing salami sunt buffalo ad consequat pariatur.
          </div>
          <div className={`${styles.contextItem}`}>
            Pork chop est picanha sausage. Magna bacon aliquip, jowl eu qui
            eiusmod ham duis nisi cow aute elit jerky swine. Laborum pig labore
            ut shoulder swine culpa tail veniam tongue. Rump nulla tongue,
            laboris short loin andouille beef deserunt beef ribs consectetur
            drumstick pork loin salami. Nisi ham hock nostrud flank pastrami
            aliquip pork loin, labore leberkas voluptate buffalo qui veniam
            pork. Officia eiusmod chislic sausage shankle porchetta. Cillum elit
            officia est, buffalo tempor landjaeger sed id nostrud.
          </div>
          <div className={`${styles.contextItem}`}>
            Ipsum pariatur rump bacon quis anim proident eu sunt turkey. Picanha
            qui ham hock, in ground round cillum bresaola. Pork belly nulla
            deserunt alcatra buffalo brisket. Porchetta ham hock ball tip chuck
            adipisicing ut aute ex beef ribs. Non sirloin elit chuck, velit
            dolore pork. Jowl buffalo landjaeger tri-tip pork chop mollit.
          </div>

          <div className={`${styles.contextItem}`}>
            Duis rump ut beef ribs. Strip steak ex kielbasa et occaecat t-bone
            laboris turkey veniam. Duis pork chop landjaeger anim kielbasa. Eu
            aliqua ut, esse minim hamburger sausage meatloaf reprehenderit in
            t-bone. Turducken pariatur ad, in consequat bacon esse chuck tail
            labore. Pig ullamco consectetur dolor aliquip sirloin. Pork loin
            nulla shank burgdoggen ipsum frankfurter fugiat salami pancetta
            reprehenderit ball tip ham picanha beef ribs eu.
          </div>

          <div className={`${styles.contextItem}`}>
            Flank aute qui short loin irure fugiat nulla pork chop non sunt.
            Turducken filet mignon adipisicing, magna leberkas exercitation
            meatloaf quis pancetta alcatra jowl nostrud laborum. Aliqua quis
            consequat porchetta pastrami, ground round boudin sunt brisket
            cillum et jowl.
          </div>

          <div className={`${styles.contextItem}`}>
            Real-time Serverless Websocket Chat Placeholder
          </div>
        </div>
      </div>
    </main>
  );
}
