import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { address } = await req.json();
		const response = await axios.post(
			process.env.CAVOS_CORE_API + 'v1/wallet/usd/balance',
			{ address: address },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.CAVOS_CORE_TOKEN}`,
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
