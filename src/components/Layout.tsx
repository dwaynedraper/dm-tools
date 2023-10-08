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
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
  { name: 'Tracker', href: '/tracker', icon: UsersIcon, current: false },
  { name: 'World', href: '/world', icon: FolderIcon, current: false },
];
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
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

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.to('.sidebar', {
  //       yPercent: 400,
  //       ease: 'none',
  //       paused: true,
  //     })

  //     function updateScrollBar() {
  //       console.log('I updated my size')
  //     }
  //     window.addEventListener('scroll', updateScrollBar)
  //     window.addEventListener('resize', updateScrollBar)
  //   }, boxRef)

  //   return () => ctx.revert()
  // }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <main className="h-screen w-full flex" ref={boxRef}>
      <div
        className={
          sidebarOpen
            ? `${styles.sidebar} sidebar show-scrollbar`
            : `${styles.sidebar} w-96`
        }
      >
        <div className="flex grow h-full flex-col gap-y-5 overflow-y-auto bg-slate-900 px-6 pb-4 ring-1 ring-white/10">
          <div className="flex flex-col shrink-0 items-center border-b border-cyan-700 z-10">
            <LiaDiceD20Solid
              onClick={toggleSidebar}
              className="h-12 w-12 text-cyan-500"
            />
            {!sidebarOpen && (
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
          <nav className="flex flex-1 flex-col">
            <ul
              role="list"
              className={classNames(`flex flex-1 flex-col gap-y-7`, {
                'items-center': sidebarOpen,
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
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        )}
                      >
                        <item.icon
                          className="h-8 w-8 shrink-0"
                          aria-hidden="true"
                        />
                        {!sidebarOpen && item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li> */}
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <Cog6ToothIcon
                    className="h-8 w-8 shrink-0"
                    aria-hidden="true"
                  />
                  {!sidebarOpen && 'Settings'}
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
