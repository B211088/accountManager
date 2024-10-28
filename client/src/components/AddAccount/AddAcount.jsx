import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const AddAcount = ({ onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    idTiktok: "",
    accountGoogle: "",
    date: new Date().toISOString().split("T")[0], // Đặt giá trị mặc định là ngày hiện tại
    pertain: "",
  });

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (data.idTiktok && data.accountGoogle) {
        const timeStamp = new Date(data.date).getTime();
        const inputDate = new Date(timeStamp);
        const currentDate = new Date();
        if (inputDate > currentDate) {
          alert("Ngày không được lớn hơn ngày hiện tại.");
          return;
        }

        const newData = {
          ...data,
          date: timeStamp,
        };

        dispatch(actions.createAccount.createAccountRequest(newData));
        setData({
          idTiktok: "",
          accountGoogle: "",
          date: new Date().toISOString().split("T")[0], // Đặt lại giá trị ngày sau khi thêm tài khoản
          pertain: "",
        });
        onSuccess();
        dispatch(actions.getAccounts.getAccountsRequest());
      } else {
        console.log("Please fill out all required fields.");
      }
    },
    [data, dispatch, onSuccess]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="absolute flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-bg-overlay z-[2]"
      onClick={handleOverlayClick}
    >
      <div className="w-[400px] h-[430px] flex flex-col items-center bg-bg-light z-6 rounded-[5px] opacity-1 p-[10px] z-[3]">
        <div className="w-full">
          <h1 className="font-bold text-[1.2rem]">Thêm tài khoản</h1>
        </div>
        <form
          className="flex flex-col gap-[10px] w-full z-[4]"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="idTiktok"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            placeholder="Nhập id tiktok..."
            value={data.idTiktok}
            onChange={handleChange}
          />

          <input
            type="text"
            name="accountGoogle"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            placeholder="Nhập account Google..."
            value={data.accountGoogle}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            value={data.date} // Sử dụng giá trị ngày trong state
            onChange={handleChange}
          />

          <select
            name="pertain"
            className="w-full h-[36px] border-[1px] border-cl-border-input rounded-[5px] px-[5px] text-[0.8rem] mt-[20px]"
            value={data.pertain}
            onChange={handleChange}
          >
            <option value="0">Chưa Đăng nhập trên máy nào</option>
            {Array.from({ length: 15 }, (_, index) => (
              <option key={index} value={index + 1}>
                Máy {index + 1}
              </option>
            ))}
          </select>

          <div className="w-full mt-[30px] flex flex-col justify-between">
            <button
              type="submit" // Đổi type thành "submit" để xử lý đúng khi bấm nút
              className="w-full h-[36px] bg-bg-btn-light rounded-[5px] text-[1rem] text-text-light font-bold text-text-light"
            >
              Thêm
            </button>
            <button
              type="button"
              className="w-full h-[36px] mt-[10px] bg-bg-light rounded-[5px] border-[1px] border-cl-border-input text-[1rem] text-text-dark font-bold"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAcount;
