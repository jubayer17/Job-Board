"use client";

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';

interface EmployerNavbarProps {
    onOpenSidebar: () => void;
}

export default function EmployerNavbar({ onOpenSidebar }: EmployerNavbarProps) {
    const { data: session } = useSession();

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="-ml-2 mr-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                    onClick={onOpenSidebar}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 uppercase tracking-widest lg:hidden">
                    JobPortal
                </h1>
                 <h1 className="text-xl font-bold text-gray-900 uppercase tracking-widest hidden lg:block">
                    Dashboard
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                {session?.user?.name?.[0] || 'E'}
                            </div>
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.name || 'Employer'}</p>
                                        <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className={`${active ? 'bg-gray-100' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}
