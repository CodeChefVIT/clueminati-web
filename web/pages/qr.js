import React, { useState, useEffect } from "react";
import QRCodeScanner from "./../components/qrScanner";
import Router from "next/router";
import QRPage from "./../public/qrpage.png";
import Image from "next/image";

function QRScanner() {
  const [qrData, setQrData] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userUid = localStorage.getItem("uid");

  useEffect(() => {
    if (!userUid) {
      Router.push("/login");
      return;
    }
  }, []);

  const handleScanResult = (data) => {
    setQrData(data);
    openModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setQrData("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-5">
      <div>
        <h1 className="text-3xl font-bold my-10">QR Code Scanner</h1>
        <Image src={QRPage} alt="" className="pb-10" />
      </div>
      <div className="w-full max-w-md pb-60">
        <QRCodeScanner onResult={handleScanResult} />

        {modalIsOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-content bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold">Question</h2>
              <p className="pt-3 pb-6">{qrData}</p>
              <button
                onClick={closeModal}
                className="px-6 py-2 font-bold bg-[#3CCB25] text-white rounded-lg hover:bg-[#3bcb25c9] focus:outline-none focus:ring focus:ring-[#3bcb25c9] w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => Router.push("/dashboard")}
          className="px-6 py-2 mt-6 font-bold bg-[#3CCB25] text-white rounded-lg hover:bg-[#3bcb25c9] focus:outline-none focus:ring focus:ring-[#3bcb25c9] w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default QRScanner;
