import React from "react";

function Footer({ inScheduler }) {
  console.log(inScheduler);
  return (
    <footer className={inScheduler ? "footer__scheduler" : "footer"}>
      <p>
        Creado con {"<3"} por{" "}
        <a className="github__link" href="https://github.com/sergiolv">
          @SergioLV
        </a>{" "}
        y{" "}
        <a className="github__link" href="https://github.com/vicebp">
          @ViceBP
        </a>{" "}
      </p>
    </footer>
  );
}

export default Footer;
