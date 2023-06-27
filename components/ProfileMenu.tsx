'use client';

import { SessionInterface } from '@/common.type';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  return (
    <>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={40}
          height={40}
          className="rounded-full"
          alt={session.user.name}
        />
      )}
      <button type="button" className="text-sm" onClick={() => signOut()}>
        Se déconnecter
      </button>
    </>
  );
};

export default ProfileMenu;
