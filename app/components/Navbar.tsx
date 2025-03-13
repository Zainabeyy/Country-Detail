import ToggleThemeButton from "./ToggleThemeButton";

export default function Navbar(){
    
    return(
        <div className="shadow-md flex-between elements px-7 xs:px-20 py-7">
            <h1 className="font-extrabold xs:text-2xl">Where in the world?</h1>
            <ToggleThemeButton/>
        </div>
    )
}