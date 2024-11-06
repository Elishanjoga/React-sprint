import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import { Route, Routes, Link } from "react-router-dom";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { routes } from "../routes";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "Trips", href: "/trips", icon: Squares2X2Icon, current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-dark transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <h1 className="text-white">RAPID TECH</h1>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul
                    role="list"
                    className="flex flex-1 flex-col gap-y-7"
                  >
                    <li>
                      <ul
                        role="list"
                        className="-mx-2 space-y-1"
                      >
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "text-purple"
                                  : "text-white hover:hover:text-purple",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-purple"
                                    : "text-white group-hover:purple",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white hover:hover:text-purple"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-white group-hover:text-purple"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r-2 border-purple">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-dark px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <h1 className="text-white">RAPID TECH</h1>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul
                role="list"
                className="flex flex-1 flex-col gap-y-7"
              >
                <li>
                  <ul
                    role="list"
                    className="-mx-2 space-y-1"
                  >
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "text-purple"
                              : "text-indigo-200 hover:text-purple",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white hover:hover:text-purple"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-white group-hover:text-purple"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky bg-dark top-0 z-40 flex h-16 shrink-0 items-center w-full gap-x-4  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon
                aria-hidden="true"
                className="h-6 w-6"
              />
            </button>

            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Menu
                  as="div"
                  className="relative ml-auto"
                >
                  <MenuButton className="-m-1.5 flex items-center p-1.5 ml-auto">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-dark py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="bg-dark content">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                {routes.map((item, index) => (
                  <Route
                    {...item}
                    key={index}
                  />
                ))}
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
