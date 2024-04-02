import axios from 'axios';

export const getServerConfig = async () => {
  const { data: response } = await axios.get(`/config`);
  return response;
};
