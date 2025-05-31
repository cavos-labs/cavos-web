import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const { investmentAmount, wallet } = await req.json();
		const response = await axios.post(
			process.env.WALLET_PROVIDER_API + 'position',
			{
				amount: investmentAmount,
				address: wallet.address,
				publicKey: wallet.public_key,
				hashedPk: wallet.private_key,
				hashedPin: wallet.pin,
				deploymentData: wallet.deployment_data,
				deployed: wallet.deployed,
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
