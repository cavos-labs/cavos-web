import { atom } from 'jotai';

interface UserWallet {
	address: string;
	created_at: string;
	id: number;
	phone: string | null;
	pin: string;
	private_key: string;
	public_key: string;
	uid: string;
	updated_at: string;
	user_name: string | null;
}

export const useUserWallet = atom<UserWallet | null>(null);
