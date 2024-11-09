"use client"

export function FeedbackForm() {
    return (
        <form className="flex flex-col items-start justify-center gap-y-5 w-full">
            <div className="flex flex-col items-start justify-center gap-y-2 w-full">
                <label htmlFor="title" className="text-md font-medium">Title</label>
                <input type="text" id="title" name="feedback" title="Title" className="w-full rounded-md bg-zinc-900 min-h-8 px-2 text-white" placeholder="e.g. New feature..." />
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2 w-full">
                <label htmlFor="feedback" className="text-md font-medium">Feedback</label>
                <textarea id="feedback" name="feedback" title="Feedback" className="w-full rounded-md bg-zinc-900 p-2 resize-none min-h-36" placeholder="It would be cool if you added the following feature to Sol AI..."></textarea>
            </div>
            <div className="flex flex-col items-start justify-center gap-y-2 w-full">
                <label htmlFor="type" className="text-md font-medium" >Type</label>
                <select defaultValue="New feature" name="type" id="type" title="Type" className="w-full rounded-md bg-zinc-900 min-h-8 px-2 text-white cursor-pointer">
                    <option value="New feature">New feature</option>
                    <option value="UI/UX">UX/UI</option>
                    <option value="New project">New project</option>
                    <option value="Error">Error</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button className="w-full min-h-10 rounded-md border-solana-purple border-2 text-white font-semibold bg-solana-purple transition-all hover:opacity-80">Send</button>
        </form>
    )
}