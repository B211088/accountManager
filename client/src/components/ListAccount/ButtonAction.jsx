const ButtonAction = ({ onModify, onDelete, onResetTime }) => {
  return (
    <div className="absolute w-[160px] top-[33px] right-0 z-2 text-[0.8rem] border-[1px] border-cl-border bg-bg-light rounded-[5px] z-[4]">
      <ul>
        <li
          className="relative flex items-center justify-center h-[30px] hover:bg-bg-btn-hover bg-bg-light"
          onClick={onModify}
        >
          <span> Chỉnh sửa</span>
        </li>

        <li
          className="h-[30px] flex items-center justify-center  hover:bg-bg-btn-hover bg-bg-light"
          onClick={onDelete}
        >
          <span> Xóa</span>
        </li>
        <li
          className="relative flex items-center justify-center  h-[30px] hover:bg-bg-btn-hover bg-bg-light"
          onClick={onResetTime}
        >
          <span> Đặt lại thời gian</span>
        </li>
      </ul>
    </div>
  );
};

export default ButtonAction;
