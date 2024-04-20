import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DarkModeToggle({ isDarkMode, toggleDarkMode }) {

    return (
        <div className="cursor-pointer">
            {
                isDarkMode ? (
                    <FontAwesomeIcon icon={faMoon} onClick={toggleDarkMode} size="xl"/>
                ) :
                    (
                        <FontAwesomeIcon icon={faSun} onClick={toggleDarkMode} size="xl"/>
                    )
            }
        </div>
    );
}

export default DarkModeToggle;
