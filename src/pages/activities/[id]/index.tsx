import { useState } from "react";
import Image from "next/image";
import { apiHandler } from "@/util/api";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// using SSR
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let accessToken: string = "";

  try {
    const userSession = await getSession(context);
    accessToken = userSession?.user?.access_token || "";
  } catch (e) {
    console.log("No access token detected");
  }

  const path = `attendees/event/${context.params?.id}`;

  const { responsePayload } = await apiHandler(path, accessToken, "GET");

  return {
    props: {
      data: responsePayload,
      session: await getSession(context),
    },
  };
}

// eslint-disable-next-line no-unused-vars
export default function Activities({
  session,
  data,
}: {
  session: any;
  data: { events: any[], count: number };
}) {
  // eslint-disable-next-line no-unused-vars
  const [students, setStudents] = useState<any[]>(data.events || []);

  // using CSR
  const router = useRouter()
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
                Students
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
                {students.map((student) => {
                  return (
                    <tr
                      key={student.student.id}
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
                              {student.student.student_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="pl-12">
                        <p className="text-sm font-medium leading-none text-gray-800">
                          {student.student.student_email}
                        </p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{student.student.student_college_name}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{student.student.role}</p>
                      </td>
                      <td className="pl-16">
                        <div className="flex items-center">
                          <p>{student.student.student_email}</p>
                        </div>
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
