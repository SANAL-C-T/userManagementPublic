import React, { useEffect,useState } from "react";
import Searchbar from "../component/Searchbar";
import UserTiles from "../component/UserTile";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/AdminSlice";
import "../Css/adminHome.css";
import Pagination from '../component/Pagination';

const Adminhomebody = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
  // useEffect(() => {
  //   dispatch(getUser({ page: currentPage, limit: 10 }));
  //   .unwrap()
  //   .then((result) => {
  //     console.log("Signup Successful:", result);
  //     // Navigate to success page or handle success scenario
  //   })
  //   .catch((error) => {
  //     console.error("Signup Failed:", error);
  //     // Display error message or handle error scenario
  //   }
  // }, [dispatch,currentPage]);

  useEffect(() => {
    dispatch(getUser({ page: currentPage, limit: 3 }))
      .unwrap()
      .then((result) => {
        setTotalPage(result.length)
        console.log("User data fetched successfully:", result.length);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
      });
  }, [dispatch, currentPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    }

  return (
    <div className="Adminhomebody">
      <Searchbar />
      <UserTiles />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Adminhomebody;
