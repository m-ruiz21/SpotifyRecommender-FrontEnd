'use client'
import Image from "next/image";

function Navbar() {
    return (
        <nav className="flex justify-between items-start h-16 bg-transparent text-black relative pt-6" role="navigation">
            
            { /* our fire ass logo */ } 
            <div className="px-8 cursor-pointer">
                <a href="/">
                    { /*eslint-disable-next-line @next/next/no-img-element */ }
                    <img src="/appotify.png" alt="logo" className="sm:w-12 w-10 h-auto"/>
                </a>
            </div>                

        </nav>
    );
}

export default Navbar;