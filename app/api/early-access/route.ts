import { NextRequest, NextResponse } from 'next/server'
import nacl from 'tweetnacl'
import bs58 from 'bs58'
import { PublicKey } from '@solana/web3.js'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
    try {
        const { wallet, signature, message } = await req.json()

        if (!wallet || !signature || !message) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const messageBytes = new TextEncoder().encode(message)

        const signatureBytes = bs58.decode(signature)

        const pubkey = new PublicKey(wallet)
        const isValid = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            pubkey.toBytes()
        )

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
        }

        const { error } = await supabase.from('early_access').insert({
            wallet,
            early_access_signature: signature,
        })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })

    } catch (err) {
        return NextResponse.json({ error: (err as Error).message || 'Server error' }, { status: 500 })
    }
}
