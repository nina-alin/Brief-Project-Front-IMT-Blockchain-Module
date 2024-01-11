"use client";

import Button from "../components/general/button";
import Navbar from "../components/navbar/navbar";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import Modal from "../components/general/modal";
import AddModal from "./components/add-modal";
import { sessions } from "./components/sessions-mock";
import Icon from "./components/icon";
import ConnectedHOC from "../components/providers/connected-provider";
import Main from "../components/general/main";
import { useSDK } from "@metamask/sdk-react";

const PropalsPage = () => {
  const [openAddPropalModal, setOpenAddPropalModal] = useState<boolean>(false);

  const { account } = useSDK();

  return (
    <>
      <Navbar />
      <ConnectedHOC>
        <Main>
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <p className="text-2xl">Welcome, {account}!</p>{" "}
              <Button
                onClick={() => setOpenAddPropalModal(true)}
                title={
                  <div className="flex items-center gap-2">
                    <IoMdAdd />
                    <p>Create a new propal</p>
                  </div>
                }
              />
            </div>
            <table className="w-full text-sm text-left">
              {/* TODO: replace with real data */}
              <thead className="uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              {sessions.map((session) => (
                <tr
                  className="border-b border-black hover:cursor-pointer hover:bg-blue-900"
                  key={session.id}
                >
                  <td className="px-6 py-4">
                    <Link href={`/propals/${session.id}`}>{session.title}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <Icon status={session.status} />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </Main>
        <Modal open={openAddPropalModal}>
          <AddModal onCloseModal={() => setOpenAddPropalModal(false)} />
        </Modal>
      </ConnectedHOC>
    </>
  );
};

export default PropalsPage;
