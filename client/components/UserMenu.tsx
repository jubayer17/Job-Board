"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-none hover:bg-gray-100 transition-colors focus:outline-none">
          <div className="relative h-8 w-8 overflow-hidden bg-gray-200">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-600">
                <span className="text-sm font-bold">
                  {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-start text-xs">
            <span className="font-bold text-gray-900 line-clamp-1 max-w-[100px]">
              {session.user.name || "User"}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-none p-0 shadow-xl border border-gray-100">
        <div className="p-4 bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">{session.user.name}</p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{session.user.email}</p>
        </div>
        <div className="p-1">
          <DropdownMenuItem asChild className="rounded-none cursor-pointer">
            <Link href="/dashboard" className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="rounded-none cursor-pointer">
            <Link href="/profile" className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              Profile Settings
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-gray-100 m-0" />
        <div className="p-1">
          <DropdownMenuItem
            className="rounded-none cursor-pointer flex w-full items-center px-2 py-2 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
