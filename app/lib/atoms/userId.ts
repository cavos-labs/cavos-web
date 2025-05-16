import { atom } from 'jotai';

interface UserId {
	id: string;
}

export const useUserId = atom<UserId | null>(null);
