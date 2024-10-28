import { useState, useCallback, useRef, useEffect } from "react";
import UpdateAccount from "../UpdateAccount/UpdateAccount";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const Account = ({ account, index, onEdit }) => {
  const currentDate = Date.now();
  const timeDifference = currentDate - account.date;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const dispatch = useDispatch();
  const [isModify, setIsModify] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const modalRef = useRef(null);

  const changeStatusModalUpdate = () => {
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  const changeStatusModal = (e) => {
    e.stopPropagation();
    setIsModify(!isModify);
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

  const handleUpdateSuccess = () => {
    setIsOpenUpdateModal(false);
    onEdit();
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
      setIsModify(false);
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
      className="w-full h-full max-h-[150px] sm:h-[68px] flex flex-wrap items-center justify-between  bg-bg-light border-[1px] rounded-[5px] border-cl-border px-[10px] gap-[10px] cursor-pointer relative"
      onClick={() => {
        setIsModify(false);
        setIsOpenUpdateModal(false);
      }}
    >
      <div className="w-[30px] min-w-[30px] rounded-[5px] border-cl-border border-[1px] text-center font-bold leading-[26px]">
        {index + 1}
      </div>
      <div className="flex min-w-[280px] sm:max-w-[80%] sm:flex-row flex-col flex-1  justify-center items-center flex-wrap text-left">
        <div className="flex-1 sm:w-[20%] w-full min-w-[150px] sm:h-[68px] sm:leading-[68px] h-[20px]   font-bold px-[5px] leading-[30px] text-[0.8rem] overflow-hidden whitespace-nowrap text-ellipsis">
          IDTIKTOK: {account.idTiktok}
        </div>
        <div className="flex-1 sm:w-[50%] w-full min-w-[40%] sm:h-[68px] sm:leading-[68px] h-[60px] font-bold px-[5px] leading-[30px] text-[0.8rem] sm:overflow-hidden sm:whitespace-nowrap text-ellipsis break-words">
          Google Account: {account.accountGoogle}
        </div>

        <div className="flex-1 sm:w-[20%] w-full min-w-[60px] sm:h-[68px] sm:leading-[68px] h-[30px]  font-bold px-[5px] leading-[30px] text-[0.8rem] overflow-hidden whitespace-nowrap text-ellipsis">
          Ngày: {daysDifference}
        </div>
        <div className="flex-1 sm:w-[20%] w-full min-w-[160px] sm:h-[68px] sm:leading-[68px] h-[30px]   font-bold px-[5px] leading-[30px] text-[0.8rem]">
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
      <div className="min-w-[30px] rounded-[5px] border-cl-border border-[1px] text-center font-bold leading-[26px] text-[1.2rem]">
        <div className="w-[30px] h-[30px] relative" onClick={changeStatusModal}>
          <i className="fa-solid fa-ellipsis-vertical"></i>
          {isModify && (
            <div
              ref={modalRef}
              className="absolute w-[160px] top-[33px] right-0 z-2 text-[0.8rem] border-[1px] border-cl-border bg-bg-light rounded-[5px] z-[4]"
            >
              <ul>
                <li
                  className="relative h-[30px] hover:bg-bg-btn-hover bg-bg-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    changeStatusModalUpdate();
                  }}
                >
                  Chỉnh sửa
                </li>
                {isOpenUpdateModal && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <UpdateAccount
                      account={account}
                      onClose={changeStatusModalUpdate}
                      onSuccess={handleUpdateSuccess}
                    />
                  </div>
                )}
                <li
                  className="h-[30px] hover:bg-bg-btn-hover bg-bg-light"
                  onClick={handleDeleteAccount}
                >
                  Xóa
                </li>
                <li
                  className="relative h-[30px] hover:bg-bg-btn-hover bg-bg-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModify(false);
                    handleResetTime();
                  }}
                >
                  Đặt lại thời gian
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
