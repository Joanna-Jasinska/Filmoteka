function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in r){var n=r[e];delete r[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}).register=function(e,n){r[e]=n},n.parcelRequired7c6=i);var t=i("cawi6"),a=i("fHyLY");a=i("fHyLY");var d=i("i1JLZ"),l=i("g1uI7");i("ibbFR");l=i("g1uI7");(async()=>{(0,a.showLoader)();const e=await fetch("https://api.themoviedb.org/3/movie/popular?api_key=964358699754c21d74c014b561cf196c");return await e.json()})().then((e=>{const n=e.results;(0,d.displayMovies)(n),(0,l.createPagination)(e,"popular")})).catch((e=>console.error(e))).finally((()=>{(0,a.removeLoader)()})),window.addEventListener("resize",e(t)(l.fixPaginationBtnsOnWindowChange,30));
//# sourceMappingURL=index.abd0014e.js.map
