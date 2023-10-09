import { Fragment, useEffect, useRef, useState } from 'react';
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
import { RxDashboard } from 'react-icons/rx';
import { BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { Cinzel_Decorative } from 'next/font/google';
import Link from 'next/link';
import styles from '@/styles/Layout.module.scss';
import { gsap } from 'gsap';
import classNames from 'classnames';
import { LiaDiceD20Solid } from 'react-icons/lia';
import { Kaushan_Script, Quintessential } from 'next/font/google';

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });
const quint = Quintessential({
  weight: '400',
  subsets: ['latin'],
});

//Register GSAP plugins
gsap.registerPlugin();

const cinzel = Cinzel_Decorative({ subsets: ['latin'], weight: ['400'] });

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RxDashboard, current: false },
  {
    name: 'Tracker',
    href: '/tracker',
    icon: BsLayoutTextSidebarReverse,
    current: false,
  },
  { name: 'World Builder', href: '/world', icon: FolderIcon, current: false },
];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

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
      <div className={styles.contextBar}>
        <div className={`${styles.contextWrapper}`}>
          {/* "bg-white text-2xl text-black" */}
          <div className={`${styles.contextItem}`}>Some shit goes here</div>
          <div className={`${styles.contextItem}`}>Some shit goes here</div>
          <div className={`${styles.contextItem}`}>Some shit goes here</div>
          <div className={`${styles.contextItem}`}>Some shit goes here</div>
          <div className={`${styles.contextItem}`}>Some shit goes here</div>
        </div>
      </div>
    </main>
  );
}
