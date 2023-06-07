import { useState } from "react";
import Image from "next/image";
import { apiHandler } from "@/util/api";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

// 'use client'

// using SSR
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let accessToken: string = "";

  try {
    const userSession = await getSession(context);
    console.log("TOKEN HEREEEE", userSession);

    // Redirect to login page if no session found
    if (!userSession) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    accessToken = userSession?.user?.access_token || "";
  } catch (e) {
    console.log("No access token detected");
  }

  const path = "user";

  console.log("accessToken HEREEEE", accessToken);
  const { responsePayload } = await apiHandler(path, accessToken, "GET");

  return {
    props: {
      data: responsePayload,
      session: await getSession(context),
    },
  };
}

// eslint-disable-next-line no-unused-vars
export default function UserProfile({
  session,
  data,
}: {
  session: any;
  data: any[];
}) {
  const [show, setShow] = useState<number | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState<any[]>(data || []);

  console.log("sample data", data);
  // using CSR
  // const router = useRouter()
  // const getClients = useCallback(async () => {
  //   const responsePayload = await ky(`${router.basePath}/api/proxy/clients`, {
  //     method: 'GET',
  //   });

  //   const parsedResponse = await responsePayload.json()

  //   console.log('proxy responsePayload here', parsedResponse)
  //   setUsers((parsedResponse as unknown) as any[])
  // }, [router.basePath])

  // useEffect(() => {
  //   getClients()
  // }, [getClients])

  return (
    <>
      <main className={"flex min-h-screen flex-col items-center"}>
        <div className="w-full sm:px-6 mt-10">
          <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Users
              </p>
              <div>
                <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">
                    New User
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                  <th className="font-normal text-left pl-4">Full Name</th>
                  <th className="font-normal text-left pl-12">Email</th>
                  <th className="font-normal text-left pl-20">Office</th>
                  <th className="font-normal text-left pl-20">Role</th>
                  <th className="font-normal text-left pl-16">
                    Registration Date
                  </th>
                </tr>
              </thead>
              <tbody className="w-full">
                {users.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                    >
                      <td className="pl-4 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-10 h-10">
                            <Image
                              className="w-full h-full"
                              width={10}
                              height={10}
                              loader={() =>
                                "https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                              }
                              src="https://cdn.tuk.dev/assets/templates/olympus/projects.png"
                              alt="sds"
                            />
                          </div>
                          <div className="pl-4">
                            <p className="font-medium">
                              {user.first_name + " " + user.last_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {user.email}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{user.office}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{user.role}</p>
                      </td>
                      <td className="pl-16">
                        <div className="flex items-center">
                          <p>{user.email}</p>
                        </div>
                      </td>
                      <td id={user.id} className="px-7 2xl:px-0">
                        {show == 0 ? (
                          <button
                            onClick={() => setShow(null)}
                            className="focus:outline-none pl-7"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() => setShow(0)}
                            className="focus:outline-none pl-7"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z"
                                stroke="#A1A1AA"
                                strokeWidth="1.25"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        )}
                        {show == 0 && (
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 ">
                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
