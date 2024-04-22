import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" >
      <div className="flex flex-col items-center justify-center w-screen h-screen text-background" style={{background: "#202022"}}>
        <FontAwesomeIcon icon={faTriangleExclamation} size='10x' />

        <h1 className="mt-8" style={{ fontSize: "4rem" }}>
          {error.status === 404 ? "404" : "Oops!"}
        </h1>

        <p className="text-center" style={{ maxWidth: "25ch" }}>
          {
            error.status === 404 ?
              "The page you are looking for could not be found."
              :
              "Sorry, an unexpected error has occurred."
          }
        </p>

        {
          error.status !== 404 &&
          <p className="text-sm text-center mt-4 italic text-muted border-2 px-4 py-2" style={{ maxWidth: "30ch", borderRadius: "0.5rem" }}>
            <i>{error.statusText || error.message}</i>
          </p>
        }

        <a href='/' className="mt-8 hover:bg-primary-foreground bg-background text-foreground px-4 py-2 rounded-md">
          Go back home
        </a>
      </div>
    </div>
  );
}