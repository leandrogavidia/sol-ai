import { HeroLightLines } from "../light-lines";
import { SolanaWalletButton } from "../wallet";

export function EarlyAccess() {
    return (
        <section className="w-full min-h-screen bg-black text-white relative flex justify-center items-center">
            <HeroLightLines />

            <div className="w-full flex flex-col justify-center items-center gap-y-5 text-center">
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <p className="text-3xl font-semibold">Early Access</p>
                    <p className="text-xl font-medium">Please, connect your wallet</p>
                </div>
                <SolanaWalletButton />
            </div>
        </section>
    )
}