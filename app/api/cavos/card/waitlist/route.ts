import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabase = createClient<Database>(
	process.env.SUPABASE_URL || '',
	process.env.SUPABASE_ANON_KEY || ''
);

export async function POST(req: Request) {
	try {
		const { email, country } = await req.json();
		const { error } = await supabase
			.from('card_waitlist')
			.insert({ email, country });
		return NextResponse.json({ data: error }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
