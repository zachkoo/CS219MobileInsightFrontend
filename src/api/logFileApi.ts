import axios from 'axios';

const BASE_URL = 'http://18.216.16.239:8080/';

export const fetchFileList = async (page: number, limit: number) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const fetchItemList = async (
  filename: string,
  page: number,
  limit: number,
  startTime: string,
  endTime: string,
  typeIds: string[]
) => {
  const response = await axios.post(`${BASE_URL}search`, {
    filename,
    page,
    limit,
    start_time: startTime,
    end_time: endTime,
    type_ids: typeIds,
  });
  return response.data;
};

export const fetchItemDetail = async (log_name: string) => {
  const response = await axios.get(`${BASE_URL}get_item_detail`, {
    params: {
      log_name,
    }
  });
  return response.data;
};

export const fetchFileInfo = async (filename: string) => {
  const response = await axios.get(`${BASE_URL}get_file_info`, {
    params: {
      filename,
    }
  });
  return response.data;
};