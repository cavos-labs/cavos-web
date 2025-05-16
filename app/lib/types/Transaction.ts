export interface Transaction {
	amount: number;
	created_at: string;
	id: number;
	tx_hash: string | null;
	type: string;
	uid: string;
}
