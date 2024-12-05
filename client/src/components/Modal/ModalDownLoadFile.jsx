import React, { useEffect, useState } from "react";
import { fetchFiles, downloadFile } from "../../api/index";

const ModalDownLoadFile = ({ onClose }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        const fileList = await fetchFiles();
        setFiles(fileList);
      } catch (error) {
        console.error("Không thể lấy danh sách file", error);
      }
    };

    getFiles();
  }, []);

  const handleDownload = (filename) => {
    downloadFile(filename);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-bg-overlay z-10 px-[8px]"
      onClick={handleOverlayClick}
    >
      <div className="w-[400px] flex flex-col items-center bg-bg-light rounded-[5px] p-[10px] z-[3]">
        <div className="w-full py-[10px]">
          <h1 className="text-[1rem] font-bold">Danh sách file</h1>
        </div>
        <div className="w-full">
          {files.length > 0 ? (
            <ul className="list-none">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-[5px] border-1 rounded-[5px] my-[10px] px-[5px] "
                >
                  <span>{file}</span>
                  <button
                    onClick={() => handleDownload(file)}
                    className="ml-[10px]  bg-blue-500 text-white px-[15px] py-[5px] rounded-[3px] boder-1 bg-bg-btn-light text-text-light"
                  >
                    Tải về
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chưa có file nào được tải lên.</p>
          )}
          <button
            className="w-full border-1 rounded-[5px] py-[5px] font-bold"
            onClick={onClose}
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDownLoadFile;
