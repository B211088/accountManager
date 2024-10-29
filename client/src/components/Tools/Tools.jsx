import { useState } from "react";

const Tools = ({ onClick }) => {
  const [statusAddButton, setStatusAddAccount] = useState(false);

  const onChangeStatusAddButton = () => {
    setStatusAddAccount(!statusAddButton);
  };

  return (
    <div
      className="absolute w-[60px] h-[60px] bg-bg-btn-light rounded-[50%] bottom-[120px] right-[20px] text-center text-[1.4rem] leading-[60px] text-text-light cursor-pointer  z-10"
      // Gọi hàm onClick được truyền vào khi click
    >
      <div
        className="w-full h-[60px] relative"
        onClick={onChangeStatusAddButton}
      >
        <i className="fa-solid fa-gear"></i>
      </div>
      {statusAddButton && (
        <div
          className="absolute w-[40px] h-[40px] bg-bg-btn-light  rounded-[50%] top-[-60px] right-[20px] text-center text-[1rem] font-bold leading-[40px] transition ease-linear delay-150"
          onClick={onClick}
        >
          <i className="fa-solid fa-plus"></i>
        </div>
      )}
    </div>
  );
};

export default Tools;
