import Header from "../components/header/Header";
import ListAcount from "../components/ListAccount/ListAcount";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <Header />
      <ListAcount />
    </div>
  );
};

export default HomePage;
