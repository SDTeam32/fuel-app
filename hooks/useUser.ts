import {create} from 'zustand'

interface User {
    userID?: number;
    setUserID: (id: number | undefined) => void;
}

export const useUser = create<User>((set:any) => ({
        userID:undefined,
        setUserID: (id: number | undefined) => set({ userId: id })
    })
)