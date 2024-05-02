'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const id = session?.user.id;
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log('User data:', userData);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
