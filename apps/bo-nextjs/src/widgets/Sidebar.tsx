import { House, LayoutDashboardIcon, LogOut } from 'lucide-react';
import NextLink from 'next/link';

export default function Sidebar() {
  return (
    <div className="flex w-12 flex-col items-center justify-between gap-4 bg-gray-200">
      <NextLink href="/">
        <House />
      </NextLink>
      <ul className="flex flex-1 flex-col gap-2">
        <li>
          <NextLink href="/">
            <LayoutDashboardIcon />
          </NextLink>
        </li>
        <li>
          <NextLink href="/">
            <LayoutDashboardIcon />
          </NextLink>
        </li>
        <li>
          <NextLink href="/">
            <LayoutDashboardIcon />
          </NextLink>
        </li>
      </ul>
      <NextLink href="/">
        <LogOut />
      </NextLink>
    </div>
  );
}
