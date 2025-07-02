import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const response = await axios.post(
			process.env.WALLET_PROVIDER_API + 'vesu/pool/apy',
			{
				poolName: 'Re7 USDC',
				assetSymbol: 'USDC',
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
