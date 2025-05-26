import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { wallet } = await req.json();
		const response = await axios.post(
			process.env.WALLET_PROVIDER_API + 'vesu/positions',
			{
				address: wallet.address,
				pool: 'Re7 USDC',
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.WALLET_PROVIDER_TOKEN}`,
				},
			}
		);
		return NextResponse.json({ data: response.data }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
