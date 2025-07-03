import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { txHash } = await req.json();
		const response = await axios.get(
			`https://services.cavos.xyz/api/v1/external/tx?txHash=${txHash}&network=mainnet`
		);
		return NextResponse.json({ data: response.data }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
