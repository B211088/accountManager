import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { accountsState$ } from "../../redux/selector";
import Account from "./Account";
import AddAcount from "../AddAccount/AddAcount";
import Tools from "../Tools/Tools";

import ModalUploadFile from "../Modal/ModalUploadFile";
import ModalDownLoadFile from "../Modal/ModalDownLoadFile";

const ListAccount = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(accountsState$);
  const [accountList, setAccountList] = useState(accounts || []);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMachine, setFilterMachine] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [statusAddAccount, setStatusAddAccount] = useState(false);
  const [statusUploadFile, setStatusUploadFile] = useState(false);
  const [statusDownloadFile, setStatusDownloadFile] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const changeStatusAddAccount = () => {
    setStatusAddAccount(!statusAddAccount);
  };

  const changeStatusModalUploadFile = () => {
    setStatusUploadFile(!statusUploadFile);
  };

  const changeStatusModalDowloadFile = () => {
    setStatusDownloadFile(!statusDownloadFile);
  };

  const handleAddAccountSubmit = () => {
    setStatusAddAccount(false);
    handleRefreshList();
  };

  const [edit, setEdit] = useState(false);

  const handleRefreshList = () => {
    setEdit((prev) => !prev);
  };

  const handleRefreshListAdd = () => {
    setRefreshList((prev) => !prev);
  };

  useEffect(() => {
    dispatch(actions.getAccounts.getAccountsRequest());
  }, [dispatch, refreshList, edit]);

  useEffect(() => {
    setAccountList(accounts || []);
  }, [accounts]);

  const sortAccounts = (accountsToSort) => {
    return [...accountsToSort].sort((a, b) => {
      const daysA = Math.floor((Date.now() - a.date) / (1000 * 60 * 60 * 24));
      const daysB = Math.floor((Date.now() - b.date) / (1000 * 60 * 60 * 24));

      switch (sortOption) {
        case "dateAsc":
          return daysA - daysB;
        case "dateDesc":
          return daysB - daysA;
        case "pertainAsc":
          return a.pertain - b.pertain;
        case "pertainDesc":
          return b.pertain - a.pertain;
        default:
          return 0;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFilterMachineChange = (e) => {
    setFilterMachine(e.target.value);
  };

  const handleSelectAccount = (accountId) => {
    setSelectedAccounts((prev) => {
      if (prev.includes(accountId)) {
        return prev.filter((id) => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  const filteredAccounts = accountList?.filter((account) => {
    const matchesSearch =
      account.idTiktok?.toLowerCase().includes(searchTerm) ||
      account.accountGoogle?.toLowerCase().includes(searchTerm);
    const matchesMachine = filterMachine
      ? account.pertain === parseInt(filterMachine)
      : true;
    return matchesSearch && matchesMachine;
  });

  const sortedAccounts = sortAccounts(filteredAccounts);

  return (
    <div className="w-full sm:w-[90%] min-w-[360px] flex flex-col items-center relative z-[1] px-[10px]">
      <div className="w-full flex items-center justify-between flex-wrap mt-[30px] py-[10px] px-[10px] bg-bg-light border-[1px] rounded-[5px] border-cl-border">
        <div className="sm:flex-1  w-full h-[50px] flex items-center justify-between sm:justify-start gap-[20px]">
          <h1 className="min-w-[130px]">
            Số lượng acc: {filteredAccounts.length}
          </h1>

          <select
            id="filterMachine"
            value={filterMachine}
            onChange={handleFilterMachineChange}
            className="border rounded-[2px]  w-[38%] sm:w-[120px]   max-w-[200px] text-[0.9rem] px-[5px] h-[34px]"
          >
            <option value="">Tất cả</option> {/* Chọn tất cả */}
            {Array.from({ length: 16 }, (_, index) => (
              <option key={index} value={index + 1}>
                Máy {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:flex-1 w-full flex items-center sm:justify-end h-[50px] justify-between gap-[5px] sm:gap-[20px]">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Nhập ID TikTok hoặc Email"
            className="border w-[60%] max-w-[360px] rounded-[2px] text-[0.9rem] px-[5px] h-[34px]"
          />

          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
            className="border rounded-[2px] w-[38%] max-w-[200px] text-[0.9rem] px-[5px] h-[34px]"
          >
            <option value="">Chọn sắp xếp</option>
            <option value="dateAsc">Ngày Tăng dần</option>
            <option value="dateDesc">Ngày Giảm dần</option>
            <option value="pertainAsc">Máy Tăng dần</option>
            <option value="pertainDesc">Máy Giảm dần</option>
          </select>
        </div>
      </div>

      <div
        className="w-full mt-[30px] flex flex-col gap-[10px] overflow-auto scrollbar-hide mb-[30px] py-[10px] z-[2]"
        style={{ height: "calc(100vh - 224px)" }}
      >
        {sortedAccounts.length > 0 ? (
          sortedAccounts.map((account, index) => (
            <Account
              key={account._id}
              index={index}
              account={account}
              onEdit={handleRefreshList}
              isSelected={selectedAccounts.includes(account._id)}
              onSelect={handleSelectAccount}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không thể tìm thấy tài khoản nào {":(("}
          </div>
        )}
        <Tools
          openAddAccount={changeStatusAddAccount}
          onOpentUploadFile={changeStatusModalUploadFile}
          onOpentDownloadFile={changeStatusModalDowloadFile}
        />
        {statusAddAccount && (
          <AddAcount
            onClose={handleAddAccountSubmit}
            submitSucces={handleRefreshListAdd}
          />
        )}

        {statusUploadFile && (
          <ModalUploadFile onClose={() => changeStatusModalUploadFile(false)} />
        )}

        {statusDownloadFile && (
          <ModalDownLoadFile
            onClose={() => changeStatusModalDowloadFile(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ListAccount;
