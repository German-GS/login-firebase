export function Alert({message}){
    return (
        <div className="bg-red-100 text-red-700 px-4 py-4 rounded mb-2 text-center">
            <span className="sm:inline block">{message}</span>
            
        </div>
    )
}