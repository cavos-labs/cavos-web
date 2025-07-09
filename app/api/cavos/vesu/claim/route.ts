import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { wallet } = await req.json();
		const response = await axios.post(
			process.env.CAVOS_CORE_API + 'v1/vesu/position/usd/claim',
			{
				address: wallet.address,
				hashedPk: wallet.private_key,
				hashedPin: wallet.pin,
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
