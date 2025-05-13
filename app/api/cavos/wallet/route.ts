import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

const supabase = createClient<Database>(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
	try {
		const { userId } = await req.json();
		const { data, error } = await supabase
			.from('user_wallet')
			.select('*')
			.eq('uid', userId);
		return NextResponse.json({ data: data }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
