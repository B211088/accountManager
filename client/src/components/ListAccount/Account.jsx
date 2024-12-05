import { useState, useCallback, useRef, useEffect } from "react";
import UpdateAccount from "../UpdateAccount/UpdateAccount";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import ButtonAction from "./ButtonAction";

const Account = ({ account, index, onEdit }) => {
  const currentDate = Date.now();
  const timeDifference = currentDate - account.date;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const modalRef = useRef(null);

  const [data, setData] = useState(account);

  useEffect(() => {
    setData(data);
  }, [account]);

  const handleChangModalUpdate = () => {
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  const handleCancelModalUpdate = (e) => {
    setIsOpenUpdateModal(!isOpenUpdateModal);
    e.stopPropagation;
  };

  const handleDeleteAccount = useCallback(
    (e) => {
      e.stopPropagation();
      const confirmDelete = window.confirm(
        `Bạn có chắc muốn xóa tài khoản TikTok với ID: ${account.idTiktok}?`
      );
      if (confirmDelete) {
        dispatch(actions.deleteAccount.deleteAccountRequest(account));
        onEdit();
      }
    },
    [dispatch, account, onEdit]
  );

  const toggleActionMenu = (e) => {
    e.stopPropagation();
    setIsActionMenuOpen(!isActionMenuOpen);
  };
  const handleResetTime = useCallback(() => {
    const newDataAccount = {
      ...account,
      date: currentDate,
    };
    dispatch(actions.updateAccount.updateAccountRequest(newDataAccount));
    onEdit();
  }, [account]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpenUpdateModal(false);
      setIsActionMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full h-full max-h-[150px] sm:h-[68px] flex flex-wrap items-center justify-between  bg-bg-light border-[1px] rounded-[5px] border-cl-border px-[10px] gap-[10px] cursor-pointer relative "
      onClick={() => {
        setIsOpenUpdateModal(false);
        setIsActionMenuOpen(false);
      }}
    >
      <div className="w-[30px] min-w-[30px] rounded-[5px] border-cl-border border-[1px] text-center font-bold leading-[26px]">
        {index + 1}
      </div>
      <div className="flex min-w-[230px] sm:max-w-[80%] sm:flex-row flex-col flex-1  justify-center items-center flex-wrap text-left">
        <div className="flex-1 sm:w-[20%] w-full min-w-[150px] sm:h-[68px] sm:leading-[68px] h-[20px] font-bold px-[5px] leading-[30px] text-[0.8rem] overflow-hidden whitespace-nowrap text-ellipsis">
          IDTIKTOK: {account.idTiktok}
        </div>
        <div className="flex-1 sm:w-[50%] w-full min-w-[40%] sm:h-[68px] sm:leading-[68px] h-[60px] font-bold px-[5px] leading-[30px] text-[0.8rem] sm:overflow-hidden sm:whitespace-nowrap text-ellipsis break-words">
          Google Account: {account.accountGoogle}
        </div>

        <div className="flex-1 sm:w-[20%] w-full min-w-[60px] sm:h-[68px] sm:leading-[68px] h-[30px] font-bold px-[5px] leading-[30px] text-[0.8rem] overflow-hidden whitespace-nowrap text-ellipsis">
          Ngày: {daysDifference}
        </div>
        <div className="flex-1 sm:w-[20%] w-full min-w-[160px] sm:h-[68px] sm:leading-[68px] h-[30px] font-bold px-[5px] leading-[30px] text-[0.8rem]">
          Máy:{" "}
          {account.pertain == null || account.pertain === 0
            ? "Chưa đăng nhập"
            : account.pertain}
        </div>
      </div>
      <div className="w-[30px] h-[30px] min-w-[30px] flex items-center justify-center sm:relative absolute top-0 right-0">
        <div
          className={`w-[10px] h-[10px] rounded-full ${
            daysDifference >= 9 ? "bg-bg-green" : "bg-bg-red"
          }`}
        ></div>
      </div>
      <div className="min-w-[30px] rounded-[5px] border-cl-border border-[1px] text-center font-bold leading-[26px] text-[1.2rem] relative">
        <div
          className="w-[30px] h-[30px] leading-[30px] relative"
          onClick={toggleActionMenu}
        >
          <i className="fa-solid fa-ellipsis-vertical"></i>
          {isActionMenuOpen && (
            <ButtonAction
              onModify={handleChangModalUpdate}
              onDelete={handleDeleteAccount}
              onResetTime={handleResetTime}
            />
          )}
          {isOpenUpdateModal && (
            <UpdateAccount
              account={account}
              onClose={handleChangModalUpdate}
              onCancel={handleCancelModalUpdate}
              submitSucces={onEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
