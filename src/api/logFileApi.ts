import axios from 'axios';

const BASE_URL = 'http://18.218.252.112:8080/';

export const fetchFileList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching log files:', error);
    return [];
  }
};

export const fetchItemList = async (filename: string) => {
  try {
    const response = await axios.get(`${BASE_URL}get_items?filename=${encodeURIComponent(filename)}`);
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

export const queryItemByTypeID = async (filename: string, type_ids: string[]) => {
  try {
    const response = await axios.post(`${BASE_URL}search_type_ids`, {
      filename,
      type_ids,
    });
    return response.data;
  } catch (error) {
    console.error('Error querying item by type IDs:', error);
    return [];
  }
};