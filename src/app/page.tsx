"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/login');
  });
  // redirect('/art'); once we can retrieve a login token and it is valid
  /*return (
    <div>
      <h1>Home</h1>
      </main>
    </div>
  )*/
}
