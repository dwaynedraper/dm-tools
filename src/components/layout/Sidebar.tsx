import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { BsPin, BsPinFill, BsLayoutTextSidebarReverse } from 'react-icons/bs';
import { GoSidebarExpand } from 'react-icons/go';
import { IoEarthOutline } from 'react-icons/io5';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Kaushan_Script } from 'next/font/google';
import { gsap } from 'gsap';
import { UserButton } from '@clerk/nextjs';

//Register GSAP plugins
gsap.registerPlugin();

const kaushan = Kaushan_Script({ weight: '400', subsets: ['latin'] });

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: RxDashboard, current: false },
  {
    name: 'Combat Tracker',
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

interface SidebarProps {}

export default function Sidebar({}: SidebarProps): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarToggleable, setIsSidebarToggleable] = useState(true);
  const sidebarRef = React.useRef(null);

  useEffect(() => {
    gsap.set(sidebarRef.current, { autoAlpha: 1 }); // Ensure the sidebar is visible
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(sidebarRef.current, {
        width: '250px',
        duration: 0.3,
        ease: 'power3.out',
      });
    } else {
      gsap.to(sidebarRef.current, {
        width: '75px',
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`h-screen bg-red-100`}
        onClick={() => {
          if (isSidebarToggleable) toggleSidebar();
        }}
        onMouseEnter={() => {
          if (!isSidebarToggleable) setSidebarOpen(true);
        }}
        onMouseLeave={() => {
          if (!isSidebarToggleable) setSidebarOpen(false);
        }}
      >
        <div
          className={classNames(
            `flex flex-col h-full pb-4 overflow-y-auto grow gap-y-5 bg-slate-900 ring-1 ring-white/10`,
            {
              'px-2 pt-2': !sidebarOpen,
              'px-6 pt-4': sidebarOpen,
            },
          )}
        >
          <div className="z-10 flex flex-col items-center border-b shrink-0 border-cyan-700">
            <GiDiceTwentyFacesTwenty className="w-12 h-12 mb-2 text-cyan-500" />
            {!sidebarOpen && (
              <>
                {/* Add the letters D and M in a stack as text-9xl */}
                <div
                  className={`${kaushan.className} text-5xl self-start text-cyan-500`}
                >
                  D
                </div>
                <div
                  className={`${kaushan.className} mb-8 text-5xl self-start text-cyan-500`}
                >
                  M
                </div>
              </>
            )}
            {sidebarOpen && (
              <>
                <p
                  className={`text-5xl text-cyan-500 whitespace-nowrap ${kaushan.className}`}
                >
                  DM Tools
                </p>
                <p
                  className={`mb-8 text-5xl text-cyan-500 ${kaushan.className}`}
                >
                  Complete
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
                <ul>
                  <li>
                    <div
                      onClick={() => {
                        setSidebarOpen(true);
                        setIsSidebarToggleable(!isSidebarToggleable);
                      }}
                      className="flex items-center p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white"
                    >
                      {isSidebarToggleable ? (
                        <>
                          <BsPin className="w-8 h-8 shrink-0" />
                          {sidebarOpen && 'Manual Mode On'}
                        </>
                      ) : (
                        <>
                          <GoSidebarExpand className="w-8 h-8 shrink-0" />
                          {sidebarOpen && 'Auto-Collapse On'}
                        </>
                      )}
                    </div>
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
                <div className="mt-2">
                  <UserButton />
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
