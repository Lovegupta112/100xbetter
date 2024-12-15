import Link from "next/link";

 const Navbar=()=>{

    return (
        <div className="flex  p-1 bg-slate-900 justify-end">
        <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/post">Post</Link>
            <Link href="#">Contact</Link>
        </div>
        </div>
    )
}

export default Navbar;