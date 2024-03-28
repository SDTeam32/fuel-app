// NavBar.jsx
'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import {useRouter} from 'next/navigation'
import { useUser } from '@/hooks/useUser';

const navigation:any[] = [
  // { name: 'Dashboard', href: '/dashboard' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {

  const user = useUser()
  const router = useRouter()


  function signOut():void {
    user.logoutUser()
    router.push('/')
    return
  }
  function signIn():void {
    router.push('/')
    return
  }
  return (
    <nav className=" h-20 drop-shadow-2xl ">
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center ">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-gray-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="100%"
                      height="100%"
                      rx="16"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className=" h-16 w-96 inline-flex items-end ">
                  { navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="border-b-2 hover:border-blue-700"
                      style={{marginLeft:"1rem"}} //
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="" style={{marginTop:"1.25rem"}}>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src='/images/blank-user.png'
                        height={32}
                        width={32}
                        alt="no jalla bro"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items 
                      style={{backgroundColor:"white", border:"0px"}}
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg  ring-opacity-5 focus:outline-none">
                     {user.userID ? (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => router.push('/profile')}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signIn()}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
    </nav>
  );
}

function EditInactiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  )
}

function EditActiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}

// {classNames(
//   pathname === item.href
//     ? 'border-slate-500 text-gray-900'
//     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
//   'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
// )}
