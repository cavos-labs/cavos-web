import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

const supabase = createClient<Database>(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
	try {
		const { username } = await req.json();
		const { data: phone, error: phoneError } = await supabase
			.from('user_wallet')
			.select('phone, uid')
			.eq('user_name', username);
		return NextResponse.json({ data: phone }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
