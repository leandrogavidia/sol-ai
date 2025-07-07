import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const wallet = searchParams.get('wallet')

    if (!wallet) {
        return NextResponse.json({ error: 'Missing wallet in query' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    const { data: usage, error } = await supabase
        .from('user_daily_usage')
        .select('question_count')
        .eq('wallet', wallet)
        .eq('date', today)
        .single()

    if (error?.code === 'PGRST116') {
        return NextResponse.json({ question_count: 0 }, { status: 200 })
    }

    if (error && error.code !== 'PGRST116') {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch usage' }, { status: 500 })
    }

    const count = usage?.question_count || 0
    return NextResponse.json({ question_count: count }, { status: 200 })
}

export async function POST(req: Request) {
    const { wallet } = await req.json()

    if (!wallet) {
        return NextResponse.json({ error: 'Missing wallet' }, { status: 400 })
    }

    const today = new Date().toISOString().split('T')[0]

    const { data: usage, error: selectError } = await supabase
        .from('user_daily_usage')
        .select('*')
        .eq('wallet', wallet)
        .eq('date', today)
        .single()

    if (selectError && selectError.code !== 'PGRST116') {
        console.error(selectError)
        return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 })
    }

    let newCount = 1

    if (!usage) {
        const { error: insertError } = await supabase
            .from('user_daily_usage')
            .insert({
                wallet: wallet,
                date: today,
                question_count: 1,
                updated_at: new Date().toISOString()
            })

        if (insertError) {
            console.error(insertError)
            return NextResponse.json({ error: 'Insert failed' }, { status: 500 })
        }
    } else if (usage.question_count < 15) {
        newCount = usage.question_count + 1

        const { error: updateError } = await supabase
            .from('user_daily_usage')
            .update({
                question_count: newCount,
                updated_at: new Date().toISOString()
            })
            .eq('wallet', wallet)
            .eq('date', today)

        if (updateError) {
            console.error(updateError)
            return NextResponse.json({ error: 'Update failed' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Daily limit reached (15)' }, { status: 429 })
    }

    return NextResponse.json({ question_count: newCount }, { status: 200 })
}
