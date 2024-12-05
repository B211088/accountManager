import { useState } from "react";
import { uploadFile } from "../../api/index";

const ModalUploadFile = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Vui lòng chọn tệp trước khi tải lên.");
      return;
    }

    try {
      setUploadStatus("Đang tải lên...");
      const response = await uploadFile(selectedFile);
      setUploadStatus(response.message || "Tải lên thành công!");
    } catch (error) {
      setUploadStatus("Tải lên thất bại. Vui lòng thử lại.");
      console.error("Upload failed:", error.message);
    }
  };

  return (
    <div
      className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-bg-overlay z-[2] px-[8px]"
      onClick={handleOverlayClick}
    >
      <div className="w-[400px]  flex flex-col items-center bg-bg-light rounded-[5px] p-[10px] z-[3]">
        <div className="w-full py-[10px]">
          <h1 className="text-[1rem] font-bold text-center">Tải file lên</h1>
        </div>
        <div className="w-full my-[20px] ">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-[5px]"
          />
        </div>
        <button
          onClick={handleUpload}
          className=" w-full bg-bg-btn-light text-text-light border-1 font-bold  text-white px-[10px] py-[5px] rounded hover:bg-blue-600"
        >
          Tải lên
        </button>
        {uploadStatus && (
          <p className="w-full text-[0.9rem] mt-[10px]  text-center text-gray-600">
            {uploadStatus}
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-[10px] w-full py-[5px] border-1 rounded-[5px] font-bold"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default ModalUploadFile;
