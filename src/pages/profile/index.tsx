import { apiHandler } from "@/util/api";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let accessToken: string = "";

  try {
    const userSession = await getSession(context);

    // Redirect to login page if no session found
    if (!userSession) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    accessToken = userSession?.user?.access_token || "";
  } catch (e) {
    console.log("No access token detected");
  }

  const path = "user/me";

  const { responsePayload } = await apiHandler(path, accessToken, "GET");

  return {
    props: {
      data: responsePayload,
      session: await getSession(context),
    },
  };
}

// eslint-disable-next-line no-unused-vars
export default function Profile({
  session,
  data,
}: {
  session: any;
  data: any;
}) {
  return (
    <>
      <main className={"flex min-h-screen flex-col items-center"}>
        <div className="flex items-center justify-center w-full py-8">
          {/* Card code block start */}
          <div className="bg-white dark:bg-gray-800 shadow rounded">
            <div className="relative">
              <Image
                loader={() =>
                  "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000"
                }
                src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000"
                alt="Vercel Logo"
                className="h-56 shadow rounded-t w-full object-cover object-center"
                width={100}
                height={10}
                priority
              />
              {/* <img className="h-56 shadow rounded-t w-full object-cover object-center" src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_29.png" alt /> */}
              <div className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
                <Image
                  loader={() =>
                    "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000"
                  }
                  src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000"
                  alt="Vercel Logo"
                  width={200}
                  height={10}
                  className="w-full h-full overflow-hidden object-cover rounded"
                  priority
                />
              </div>
            </div>
            <div className="px-5 xl:px-10 pb-10 mt-10">
              <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
                <div className="xl:pr-16 w-full xl:w-2/3">
                  <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                    <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                      {data.first_name + " " + data.last_name}
                    </h2>
                    <div className="text-sm bg-indigo-700 dark:bg-indigo-600 text-white px-5 py-1 font-normal rounded-full">
                      Pro
                    </div>
                  </div>
                  <p className="text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">
                    Email: {data.email}
                  </p>
                  <p className="text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">
                    Address: {data.username}
                  </p>
                </div>
                <div className="xl:px-10 xl:border-l xl:border-r w-full py-5 flex items-start justify-center xl:w-1/3">
                  <div className="mr-6 xl:mr-10">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      82
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Reviews
                    </p>
                  </div>
                  <div className="mr-6 xl:mr-10">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      28
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Projects
                    </p>
                  </div>
                  <div>
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl xl:text-2xl leading-6 mb-2 text-center">
                      42
                    </h2>
                    <p className="text-gray-800 dark:text-gray-100 text-sm xl:text-xl leading-5">
                      Approved
                    </p>
                  </div>
                </div>
                <div className="w-full xl:w-2/3 flex-col md:flex-row justify-center xl:justify-end flex md:pl-6">
                  <div className="flex items-center justify-center xl:justify-start mt-1 md:mt-0 mb-5 md:mb-0">
                    <div className="rounded-full bg-gray-200 text-gray-600 dark:text-gray-400 text-sm px-6 py-2 flex justify-center items-center">
                      Remote
                    </div>
                    <div className="ml-5 rounded-full bg-green-200 text-green-500 text-sm px-6 py-2 flex justify-center items-center">
                      Available
                    </div>
                  </div>
                  <button className="focus:outline-none ml-0 md:ml-5 bg-indigo-700 dark:bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-3 md:px-6 py-2 text-sm">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Card code block end */}
        </div>
        <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
          <div className="w-80">
            <div className="flex items-center">
              <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                Personal Information
              </h1>
            </div>
            <p className="mt-4 text-sm leading-5 text-gray-600">
              Information about the section could go here and a brief
              description of how this might be used.
            </p>
          </div>
          <div>
            <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
              <div className="md:w-64">
                <label
                  className="text-sm leading-none text-gray-800"
                  id="firstName"
                >
                  First name
                </label>
                <input
                  disabled
                  type="name"
                  tabIndex={0}
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="firstName"
                  placeholder={data.first_name}
                />
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label
                  className="text-sm leading-none text-gray-800"
                  id="lastName"
                >
                  Last name
                </label>
                <input
                  disabled
                  type="name"
                  tabIndex={0}
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="lastName"
                  placeholder={data.last_name}
                />
              </div>
            </div>
            <div className="md:flex items-center lg:ml-24 mt-8">
              <div className="md:w-64">
                <label
                  className="text-sm leading-none text-gray-800"
                  id="emailAddress"
                >
                  Email address
                </label>
                <input
                  disabled
                  type="email"
                  tabIndex={0}
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="emailAddress"
                  placeholder={data.email}
                />
              </div>
              <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                <label
                  className="text-sm leading-none text-gray-800"
                  id="office"
                >
                  Office
                </label>
                <input
                  disabled
                  type="office"
                  tabIndex={0}
                  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                  aria-labelledby="office"
                  placeholder={data.office}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
