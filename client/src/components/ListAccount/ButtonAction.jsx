const ButtonAction = ({ onModify, onDelete, onResetTime }) => {
  return (
    <div className="absolute w-[160px] top-[33px] right-0 z-2 text-[0.8rem] border-[1px] border-cl-border bg-bg-light rounded-[5px] z-[4]">
      <ul>
        <li
          className="relative h-[30px] hover:bg-bg-btn-hover bg-bg-light"
          onClick={onModify}
        >
          Chỉnh sửa
        </li>

        <li
          className="h-[30px] hover:bg-bg-btn-hover bg-bg-light"
          onClick={onDelete}
        >
          Xóa
        </li>
        <li
          className="relative h-[30px] hover:bg-bg-btn-hover bg-bg-light"
          onClick={onResetTime}
        >
          Đặt lại thời gian
        </li>
      </ul>
    </div>
  );
};

export default ButtonAction;
