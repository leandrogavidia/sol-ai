'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { HeroLightLines } from '../light-lines'
import { SolanaWalletButton } from '../wallet'
import bs58 from 'bs58'
import { Button } from '../ui/button'
import Link from 'next/link'
import { config } from '@/lib/config'

export function EarlyAccess() {
    const { publicKey, signMessage, connected } = useWallet()
    const [status, setStatus] = useState('')
    const [verified, setVerified] = useState<boolean | null>(null)
    const [exists, setExists] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    const handleEarlyAccess = async () => {
        if (!publicKey || !signMessage) return
        setLoading(true)

        const message = `Early access verification\nWallet: ${publicKey.toBase58()}\nTime: ${new Date().toISOString()}`
        const encodedMessage = new TextEncoder().encode(message)

        try {
            const signed = await signMessage(encodedMessage)
            const signatureBase58 = bs58.encode(signed)

            const res = await fetch('/api/early-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    wallet: publicKey.toBase58(),
                    signature: signatureBase58,
                    message,
                }),
            })

            const result = await res.json()
            if (res.ok) {
                fetchVerificationStatus()
            } else {
                setStatus(`❌ Error: ${result.error}`)
            }
        } catch (err) {
            console.error(err)
            setStatus('❌ Signing failed.')
        } finally {
            setLoading(false)
        }
    }

    const fetchVerificationStatus = async () => {
        if (!publicKey) return

        try {
            const res = await fetch(`/api/verify-status?wallet=${publicKey.toBase58()}`)
            const result = await res.json()

            if (res.ok) {
                setVerified(result.verified)
                setExists(result.exists)
            }
        } catch (err) {
            console.error(err)
            console.error('Failed to fetch verification status')
        }
    }

    useEffect(() => {
        if (connected && publicKey) {
            fetchVerificationStatus()
        }
    }, [connected, publicKey])

    const canRequestAccess = connected && !exists
    const isUnverified = exists && verified === false

    return (
        <section className="w-full min-h-screen bg-black text-white relative flex justify-center items-center">
            <HeroLightLines />
            <div className="relatitve z-50 flex flex-col items-center gap-y-4 text-center">
                <p className="text-3xl font-semibold">Early Access</p>

                {
                    !connected || !publicKey ? (
                        <>
                            <p className="text-xl font-medium">Please, connect your wallet</p>
                        </>
                    ) : ""
                }

                <SolanaWalletButton />

                {connected && canRequestAccess && (
                    <Button
                        onClick={handleEarlyAccess}
                        className="bg-white text-black px-4 py-2 rounded disabled:opacity-50 mt-5 cursor-pointer"
                        disabled={loading}
                        size="sm"
                    >
                        {loading ? 'Requesting...' : 'Get Early Access'}
                    </Button>
                )}

                {connected && isUnverified && (
                    <>
                        <Button
                            className="bg-gray-600 text-white px-4 py-2 rounded opacity-50 cursor-not-allowed mt-5"
                            disabled
                        >
                            Access Requested
                        </Button>
                        <p className="text-white text-sm max-w-xs">
                            🕓 You’ve already requested early access but are not verified yet.
                            Please ask in our <Link href={config.socialMedia.discord} target="_blank" className="underline text-solana-green">Discord</Link>.
                        </p>
                    </>
                )}

                {status && <p className="mt-4">{status}</p>}
            </div>
        </section>
    )
}
