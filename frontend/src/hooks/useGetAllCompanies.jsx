import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCompanies } from '@/redux/companySlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/all`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
