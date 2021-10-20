// save information locally with no expiration date, even when closing the browser
// name of the variable, contents
// Works like a python dictionary
// generally, we don't store personal information locally
// We still need to use cookies. But this is for additional implementations.
localStorage.setItem("name", "asdf");
sessionStorage.setItem("name", "asdf");
localStorage.name = "ahora";
localStorage.removeItem("name");
localStorage.clear();
