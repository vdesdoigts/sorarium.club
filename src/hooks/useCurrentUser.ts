import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useCurrentUser = () => {
  return useQuery(['me'], async () => {
    try {
      const { data } = await axios.get<User>('/api/auth/me');

      return data;
    } catch (error) {
      return null;
    }
  });
};

export default useCurrentUser;
