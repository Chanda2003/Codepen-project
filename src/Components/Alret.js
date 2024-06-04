

function Alert({status,alretMsg}){
    return(
        <>
        <div className="fixed top-24 right-12 z-10">
            {
                status==="Success" && (
                    <div className="px-4 py-2 rounded-md bg-emerald-300 shadow-md shadow-emerald-400">
                        <p className="text-lg text-black">{alretMsg}</p>

                    </div>

                
            )}

        </div>
        </>
    )
}
export default Alert