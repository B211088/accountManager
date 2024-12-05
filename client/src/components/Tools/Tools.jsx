import { useState } from "react";

const Tools = ({ openAddAccount, onOpentUploadFile, onOpentDownloadFile }) => {
  const [statusAddButton, setStatusAddAccount] = useState(false);

  const onChangeStatusAddButton = () => {
    setStatusAddAccount(!statusAddButton);
  };

  return (
    <div className="fixed w-[60px] h-[60px] bg-bg-btn-light rounded-[50%] bottom-[120px] right-[20px] text-center text-[1.4rem] leading-[60px] text-text-light cursor-pointer  z-10">
      <div
        className="w-full h-[60px] relative"
        onClick={onChangeStatusAddButton}
      >
        <i className="fa-solid fa-gear"></i>
      </div>
      {statusAddButton && (
        <div className="">
          <div
            className="absolute w-[40px] h-[40px] bg-bg-btn-light  rounded-[50%] top-[-60px] right-[20px] text-center text-[1rem] font-bold leading-[40px] transition ease-linear delay-150"
            onClick={openAddAccount}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
          <div
            className="absolute w-[40px] h-[40px] bg-btn-upload  rounded-[50%] top-[-23px] right-[72px] text-center text-[1rem] font-bold leading-[40px] transition ease-linear delay-150"
            onClick={onOpentUploadFile}
          >
            <i className="fa-solid fa-upload"></i>
          </div>
          <div
            className="absolute w-[40px] h-[40px] bg-btn-dowload  rounded-[50%] top-[36px] right-[72px] text-center text-[1rem] font-bold leading-[40px] transition ease-linear delay-150"
            onClick={onOpentDownloadFile}
          >
            <i className="fa-solid fa-download"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
