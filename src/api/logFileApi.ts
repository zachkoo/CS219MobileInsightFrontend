import axios from 'axios';

const BASE_URL = 'http://3.22.97.231:8080/';

export const fetchFileList = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching log files:', error);
    return [];
  }
};

export const fetchItemList = async (filename: string, page: number, limit: number) => {
  try {
    const response = await axios.get(`${BASE_URL}get_items?filename=${encodeURIComponent(filename)}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching log file items:', error);
    return [];
  }
};

export const fetchItemDetail = async (log_name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}get_item_detail?log_name=${log_name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item detail:', error);
    return [];
  }
};

export const queryItemByTime = async (filename: string, start_time: string, end_time: string) => {
  try {
    const response = await axios.get(`${BASE_URL}search_timeframe?filename=${filename}&start_time=${start_time}&end_time=${end_time}`);
    return response.data;
  } catch (error) {
    console.error('Error query item by time:', error);
    return [];
  }
};

export const queryItemByTypeID = async (filename: string, type_id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}search_type_id?filename=${filename}&type_id=${type_id}`);
    return response.data;
  } catch (error) {
    console.error('Error query item by type id:', error);
    return [];
  }
};