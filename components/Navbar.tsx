import Image from 'next/image';
import Link from 'next/link';

import { NavLinks } from '@/constants';
import Authproviders from './Authproviders';

const Navbar = () => {
  const session = {};

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <li>
              <Link href={link.href} key={link.key}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session ? (
          <>
            user photo
            <Link href="/create-project">Partage ton projet</Link>
          </>
        ) : (
          <Authproviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
