import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_REQUEST } from "../constants/actionTypes";
import api from "../config/api";

export const useFetchdata = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: API_REQUEST.FETCH });

      try {
        const res = await api.get("/products");
        dispatch({ type: API_REQUEST.SUCCESS, payload: res.data });
        console.log(res.data);
      } catch (err) {
        dispatch({ type: API_REQUEST.ERROR, payload: err });
      }
    };
    getData();
  }, []);

  return {};
};
