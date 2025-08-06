import Link from "next/link";
import { Inter } from "next/font/google";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import CreateUser from "@/components/CreateUser";
import DeleteUser from "@/components/DeleteUser";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await client.connect(); // `await client.connect()` will use the default database passed in the MONGODB_URI
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div>You reached our Users actions page</div>
      <br />
      <div>
        <b>Add a user:</b>
        <CreateUser />
      </div>
      <br />
      <div>
        <b>Delete a user by email(unique)</b>
        <DeleteUser />
      </div>
      <br />
      <div>
        <a href={'/userlist'}><b>Click to navigate to users page</b></a>
      </div >

    </>
  );
}

