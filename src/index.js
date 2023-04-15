import "./sass/main.scss";

import { showLoader, removeLoader, initLoader } from "./loader";

initLoader();

//fech danych z serwera każdorazowo odpala>>>
showLoader();

// spełnienie promise/pobranie danych  z serwera(tutaj zastąpione timeoutem)>>>
setTimeout(() => {
	removeLoader();
}, 2000);
