import axios from 'axios';

export const getWalletBalance = async (address: string) => {
	try {
		const response = await axios.post(
			process.env.NEXT_PUBLIC_WALLET_PROVIDER_API + 'wallet/balance',
			{ address: address },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_WALLET_PROVIDER_TOKEN}`,
				},
			}
		);
		console.log('response');
		console.log(response);
		return response.data;
	} catch (err) {
		return -1;
	}
};
