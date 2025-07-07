export const BlinkSkeleton = () => {
    return (
        <div className="max-w-xl w-full mx-auto animate-pulse rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-4 shadow-md">
            <div className="h-5 w-1/3 bg-gray-700 rounded" />

            <div className="w-full h-40 bg-gray-800 rounded" />

            <div className="h-5 w-3/4 bg-gray-700 rounded" />
            <div className="h-5 w-1/2 bg-gray-700 rounded" />

            <div className="flex space-x-4 mt-4">
                <div className="h-10 w-1/3 bg-gray-800 rounded" />
                <div className="h-10 w-1/3 bg-gray-800 rounded" />
            </div>

            <div className="h-4 w-full bg-gray-800 rounded" />
            <div className="h-4 w-2/3 bg-gray-800 rounded" />

            <div className="h-8 w-full bg-gray-700 rounded mt-2" />
        </div>
    )
}