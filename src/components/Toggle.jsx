import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DarkModeToggle({ isDarkMode, toggleDarkMode }) {

    return (
        <div className="cursor-pointer">
            {
                isDarkMode ? (
                    <FontAwesomeIcon icon={faMoon} onClick={toggleDarkMode} />
                ) :
                    (
                        <FontAwesomeIcon icon={faSun} onClick={toggleDarkMode} />
                    )
            }
        </div>
    );
}

export default DarkModeToggle;
