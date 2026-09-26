import React from"react";import"./styles.css";
const Header=()=> <header><h1>My Portfolio</h1><nav><a href="#about">About</a><a href="#education">Education</a><a href="#skills">Skills</a><a href="#contact">Contact</a></nav></header>;
const About=()=> <section id="about"><h2>About Me</h2><p>I am a BCA student interested in web development, React and software projects.</p></section>;
const Education=()=> <section id="education"><h2>Education</h2><ul><li>Bachelor of Computer Applications (BCA)</li><li>Higher Secondary Education</li></ul></section>;
const Skills=()=> <section id="skills"><h2>Skills</h2><p>HTML • CSS • JavaScript • React • Python • C</p></section>;
const Contact=()=> <section id="contact"><h2>Contact</h2><p>Email: student@example.com</p><p>Phone: +91 90000 00000</p></section>;
const Footer=()=> <footer>© 2026 My Portfolio</footer>;
export default function App(){return <><Header/><main><About/><Education/><Skills/><Contact/></main><Footer/></>}