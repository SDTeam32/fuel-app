import { Customer } from '@/types';
import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    isLoggedIn: boolean; // Add isLoggedIn variable
    setLoggedIn: (loggedIn: boolean) => void; // Add setLoggedIn function
    userNumber?: number;
    setUserNumber: (id: number | undefined) => void;
    userID?: string;
    setUserID: (id: string | undefined) => void;
    userCode?: string;
    setUserCode: (code: string | undefined) => void;
    userName?: string;
    setUserName: (name: string | undefined) => void;
    userAddress1?: string;
    setUserAddress1: (addr1: string | undefined) => void;
    userAddress2?: string;
    setUserAddress2: (addr2: string | undefined) => void;
    userCity?: string;
    setUserCity: (city: string | undefined) => void;
    userState?: string;
    setUserState: (state: string | undefined) => void;
    userZip?: string;
    setUserZip: (zip: string | undefined) => void;
    logoutUser: () => void;
    setUser: (user: Customer) => void;

}


export const useUser = create(
    persist(
        (set:any) => ({
            isLoggedIn: false, // Initialize isLoggedIn as false
            setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }), 
            userNumber:undefined,
            setUserNumber: (id: number | undefined) => set({ userNumber: id }),
            userID:undefined,
            setUserID: (id: string | undefined) => set({ userID: id }),
            userCode:undefined,
            setUserCode: (code: string | undefined) => set({ userCode: code }),
            userName:undefined,
            setUserName: (name: string | undefined) => set({ userName: name }),
            userAddress1:undefined,
            setUserAddress1: (addr1: string | undefined) => set({ userAddress1: addr1}),
            userAddress2:undefined,
            setUserAddress2: (addr2: string | undefined) => set({ userAddress2: addr2}),
            userCity:undefined,
            setUserCity: (city: string | undefined) => set({ userCity: city}),
            userState:undefined,
            setUserState: (state: string | undefined) => set({ userState: state}),
            userZip:undefined,
            setUserZip: (zip: string | undefined) => set({ userZip: zip}),
            logoutUser: () => set({
                isLoggedIn: false,
                userNumber: undefined,
                userID: undefined,
                userCode: undefined,
                userName: undefined,
                userAddress1: undefined,
                userAddress2: undefined,
                userCity: undefined,
                userState: undefined,
                userZip: undefined,
              }),
            setUser: (user: Customer) => set({
                userNumber: user.id,
                userName: user.name,
                userAddress1: user.address1,
                userAddress2: user.address2,
                userCity: user.city,
                userState: user.state,
                userZip: user.zip,
            })
        }),
        {
            name: "user-details",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)