import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function NavBar() {
  const { data } = useSession();

  return (
    <div>
      <Head>
        <title>Thomasian Journey</title>
        <meta name="description" content="Thomasian Journey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="w-full bg-gray-800 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <h2 className="text-2xl text-white font-bold">
                  THOMASIAN JOURNEY
                </h2>
              </Link>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 hidden`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="text-white">
                  <Link href="/">Home</Link>
                </li>
                {data ? (
                  <li className="text-white">
                    <Link href="/api/auth/signout">Logout</Link>
                  </li>
                ) : (
                  <>
                    <li className="text-white">
                      <Link href="/api/auth/signin">Login</Link>
                    </li>
                    <li className="text-white">
                      <Link href="/api/auth/signin">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
