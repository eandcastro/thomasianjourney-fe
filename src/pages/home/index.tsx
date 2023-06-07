import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data, status } = useSession();

  // Redirect to login page if no session found
  useEffect(()=>{
    if(status !== 'loading' || !data) {
      router.push('/')
    }
  }, [data, status])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {status === "authenticated" && data !== null && (
        <>
          <h2>Welcome {data.user.role}</h2>
          <p>User ID: {data.user.id}</p>
          {JSON.stringify(data.user)}
          <Link href="">
            <button onClick={() => signOut({callbackUrl: '/'})} className="focus:outline-none bg-blue-500 disabled:bg-gray-200 transition duration-150 ease-in-out rounded text-white px-3 py-2 text-xs">
              Logout
            </button>
          </Link>
        </>
      )}
    </main>
  );
}
