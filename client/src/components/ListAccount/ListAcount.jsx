import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions";
import { accountsState$ } from "../../redux/selector";

const ListAccount = ({ refreshList }) => {
  const dispatch = useDispatch();
  const accounts = useSelector(accountsState$);
  const [accountList, setAccountList] = useState(accounts);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMachine, setFilterMachine] = useState("");

  useEffect(() => {
    dispatch(actions.getAccounts.getAccountsRequest());
  }, [dispatch]);

  useEffect(() => {
    setAccountList(accounts);
  }, [accounts]);

  const handleRefreshList = () => {
    refreshList();
    dispatch(actions.getAccounts.getAccountsRequest());
  };

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

  const handleMachineFilterChange = (e) => {
    setFilterMachine(e.target.value);
  };

  const filteredAccounts = accountList.filter((account) => {
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
    <div className="w-full sm:w-[90%] min-w-[410px] flex flex-col items-center relative z-[1] px-[10px]">
      <div className="w-full flex items-center justify-between flex-wrap mt-[30px] py-[10px] px-[10px] bg-bg-light border-[1px] rounded-[5px] border-cl-border">
        <div className="flex items-center justify-between sm:justify-start sm:w-[30%] w-full h-[50px] leading-[50px]">
          <h1 className="mr-[20px] w-[120px]">
            Số lượng acc: {sortedAccounts.length}
          </h1>
          <select
            id="filterMachine"
            value={filterMachine}
            onChange={handleMachineFilterChange}
            className="border rounded-[2px] w-[38%] max-w-[200px] text-[0.9rem] px-[5px] h-[34px]"
          >
            <option value="">Tất cả máy</option>
            {Array.from({ length: 16 }, (_, i) => (
              <option key={i + 1} value={(i + 1).toString()}>
                Máy {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-[70%] w-full flex items-center sm:justify-end h-[50px] justify-between">
          <label
            htmlFor="search"
            className="mr-[5px] min-w-[80px] leading-[50px] hidden sm:block"
          >
            Tìm kiếm:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Nhập ID TikTok hoặc Email"
            className="border w-[60%] max-w-[360px] rounded-[2px] text-[0.9rem] px-[5px] h-[34px]"
          />
          <label htmlFor="sortOption" className="ml-4 mr-[5px] hidden sm:block">
            Sắp xếp:
          </label>
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
          sortedAccounts.map((account) => (
            <Account
              key={account._id}
              account={account}
              onEdit={handleRefreshList}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không thể tìm thấy tài khoản nào {":(("}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAccount;
