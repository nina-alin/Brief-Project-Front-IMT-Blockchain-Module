"use client";

import Link from "next/link";
import Button from "../../components/general/button";
import Navbar from "../../components/navbar/navbar";
import { session } from "./components/propal-mock";
import { IoReturnDownBackSharp } from "react-icons/io5";
import ParticipantsModal from "./components/participants-modal";
import Modal from "../../components/general/modal";
import { useState } from "react";

const PropalsIdPage = ({ params }: { params: { id: string } }) => {
  // TODO: fetch data from the API

  const [openParticipantsModal, setOpenParticipantsModal] =
    useState<boolean>(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-8 mt-10 text-white flex flex-col gap-10">
        <Link href="/propals">
          <div className="flex w-fit items-center gap-2 hover:cursor-pointer">
            <IoReturnDownBackSharp />
            <p>Back</p>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">{session.title}</h2>
          <div className="flex items-center gap-2">
            <Button
              title="View participants"
              onClick={() => setOpenParticipantsModal(true)}
            />
            <Button title="End session" />
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Propal
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Number of votes
              </th>
            </tr>
          </thead>
          <tbody>
            {session.propals.map((propal) => (
              <tr className="border-b" key={propal.id}>
                <td className="px-6 py-4">{propal.title}</td>
                <td className="px-6 py-4">{propal.description}</td>
                <td className="px-6 py-4">{propal.votes?.length}</td>
                <td className="px-6 py-4">
                  <Button title="Vote" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Modal open={openParticipantsModal}>
        <ParticipantsModal onClose={() => setOpenParticipantsModal(false)} />
      </Modal>
    </>
  );
};

export default PropalsIdPage;
