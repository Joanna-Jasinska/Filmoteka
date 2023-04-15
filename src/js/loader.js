import { Loading } from "notiflix";

export const showLoader = (message = "Loading...") => {
	Loading.circle(message);
};
export const removeLoader = (delay = 0) => {
	Loading.remove(delay);
};
export const initLoader = () => {
	Loading.init({
		backgroundColor: "rgba(0, 0, 0,0.3)",
		clickToClose: false,
		svgSize: "200px",
		svgColor: "#ff0000",
		cssAnimationDuration: 200,
		messageFontSize: "30px",
		messageColor: "#dcdcdc",
	});
};
