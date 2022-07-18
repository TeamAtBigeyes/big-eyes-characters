import logo from '../public/logo.svg';
import Image from 'next/image'
// import './App.css';

function Home() {
    return (
        <header className="AppHeader">
            <Image src={logo} className="AppLogo" alt="logo"/>
            {/* <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a> */}
        </header>
    );
}

export default Home;
