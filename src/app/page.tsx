import { redirect } from 'next/navigation'
import Image from 'next/image'

export default function Home() {
  redirect('/login');
  // redirect('/art'); once we can retrieve a login token and it is valid
  /*return (
    <div>
      <h1>Home</h1>
      </main>
    </div>
  )*/
}
