import { INIT_STATE } from "../../constant";
import {
  getAccounts,
  createAccount,
  getType,
  updateAccount,
  deleteAccount,
} from "../actions";

export default function accountsReducers(state = INIT_STATE, action) {
  switch (action.type) {
    case getType(getAccounts.getAccountsRequest):
      return {
        ...state,
        isLoading: true,
        error: null, // Đặt lại lỗi khi bắt đầu yêu cầu
      };
    case getType(getAccounts.getAccountsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAccounts.getAccountsFailure):
      return {
        ...state,
        isLoading: false,
        error: action.error, // Lưu trữ lỗi từ action
      };
    case getType(createAccount.createAccountRequest):
      return {
        ...state,
        isLoading: true, // Bắt đầu yêu cầu tạo tài khoản
      };
    case getType(createAccount.createAccountSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false, // Đặt thành false khi thành công
      };
    case getType(createAccount.createAccountFailure):
      return {
        ...state,
        isLoading: false,
        error: action.error, // Lưu trữ lỗi khi tạo tài khoản thất bại
      };
    case getType(updateAccount.updateAccountRequest):
      return {
        ...state,
        isLoading: true, // Bắt đầu yêu cầu cập nhật tài khoản
      };
    case getType(updateAccount.updateAccountSuccess):
      return {
        ...state,
        data: state.data.map((account) =>
          account._id === action.payload._id ? action.payload : account
        ),
        isLoading: false, // Đặt thành false khi cập nhật thành công
      };
    case getType(updateAccount.updateAccountFailure):
      return {
        ...state,
        isLoading: false,
        error: action.error, // Lưu trữ thông điệp lỗi
      };
    case getType(deleteAccount.deleteAccountRequest):
      return {
        ...state,
        isLoading: true, // Bắt đầu yêu cầu xóa tài khoản
      };
    case getType(deleteAccount.deleteAccountSuccess):
      return {
        ...state,
        data: state.data.filter(
          (account) => account._id !== action.payload._id
        ), // Xóa tài khoản khỏi danh sách
        isLoading: false, // Đặt thành false khi xóa thành công
      };
    case getType(deleteAccount.deleteAccountFailure):
      return {
        ...state,
        isLoading: false,
        error: action.error, // Lưu trữ thông điệp lỗi
      };
    default:
      return state;
  }
}
