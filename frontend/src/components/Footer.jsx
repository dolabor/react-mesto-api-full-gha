import React from "react";

let yearOfIssue = new Date();

function Footer() {
  return (
      <footer className="footer">
          <p className="footer__copyright">&copy; { yearOfIssue.getFullYear() }. Mesto Russia</p>
      </footer>
  );
}

export default Footer;
