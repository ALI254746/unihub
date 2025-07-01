import { forwardRef } from "react";

const UzbekFlag = forwardRef(function UzbekFlag(_, ref) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 250"
      className="w-[100px] h-auto"
    >
      {/* Harakatsiz (chap) qismi */}
      <g id="flag-root">
        <path fill="#1eb53a" d="M0 0h100v250H0z" />
        <path fill="#0099b5" d="M0 0h100v125H0z" />
        <path fill="#ce1126" d="M0 80h100v90H0z" />
        <path fill="#fff" d="M0 85h100v80H0z" />
        <circle cx="70" cy="40" r="30" fill="#fff" />
        <circle cx="80" cy="40" r="30" fill="#0099b5" />
        <g fill="#fff" transform="translate(136 64)">
          <g id="e">
            <g id="d">
              <g id="c">
                <g id="b">
                  <path id="a" d="M0-6v6h3" transform="rotate(18 0 -6)" />
                  <use href="#a" transform="scale(-1 1)" />
                </g>
                <use href="#b" transform="rotate(72)" />
              </g>
              <use href="#b" transform="rotate(-72)" />
              <use href="#c" transform="rotate(144)" />
            </g>
            <use href="#d" y="-24" />
            <use href="#d" y="-48" />
          </g>
          <use href="#e" x="24" />
          <use href="#e" x="48" />
          <use href="#d" x="-48" />
          <use href="#d" x="-24" />
          <use href="#d" x="-24" y="-24" />
        </g>
      </g>

      {/* Hilpiraydigan o‘ng (tail) qismi */}
      <g id="flag-tail">
        <path fill="#1eb53a" d="M100 0h400v250H100z" />
        <path fill="#0099b5" d="M100 0h400v125H100z" />
        <path fill="#ce1126" d="M100 80h400v90H100z" />
        <path fill="#fff" d="M100 85h400v80H100z" />
      </g>
    </svg>
  );
});

export default UzbekFlag;
