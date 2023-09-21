import React, { useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRCodeScanner = ({ onResult }) => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    const startScanner = async () => {
      try {
        await codeReader.listVideoInputDevices();
        const constraints = {
          video: {
            facingMode: "environment",
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        codeReader.decodeFromVideoDevice(
          "",
          videoRef.current,
          (result, error) => {
            if (result) {
              onResult(result.getText());
            }
          }
        );
      } catch (error) {
        console.error("Error starting the scanner:", error);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, []);

  return <video ref={videoRef} playsInline />;
};

export default QRCodeScanner;
