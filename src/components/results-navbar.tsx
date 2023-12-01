import ProfilePicture from "./profile-picture";
import SearchBar from "./searchbar";

export function Navbar() {
    return (
        <nav className="flex justify-between items-center h-18 bg-transparent text-black relative pt-6" role="navigation"> 
            { /* our fire ass logo */ } 
            <div className="pl-4 cursor-pointer">
                <a href="/">
                    { /*eslint-disable-next-line @next/next/no-img-element */ }
                    <img src="/appotify.png" alt="logo" className="sm:w-12 w-10 h-auto"/>
                </a>
            </div>
 
            { /* search bar */}
            <SearchBar />

            { /* profile pic + dropdown */}
            <ProfilePicture />
        </nav>
    );
}
