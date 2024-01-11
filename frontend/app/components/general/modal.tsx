import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProperties {
  children: ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProperties) => {
  return (
    <>
      {open &&
        createPortal(
          <div className="w-full h-full backdrop-blur-sm absolute top-0 bottom-0 left-0 right-0">
            <div className="z-50 bg-slate-200 absolute inset-0 w-96 h-fit my-auto mx-auto rounded-xl p-5">
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
