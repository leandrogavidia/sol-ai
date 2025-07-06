// app/api/verify-status/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
    const wallet = req.nextUrl.searchParams.get('wallet')

    if (!wallet) {
        return NextResponse.json({ error: 'Missing wallet' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('early_access')
        .select('verified')
        .eq('wallet', wallet)
        .single()

    if (error && error.code !== 'PGRST116') {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
        exists: !!data,
        verified: data?.verified ?? false,
    })
}
