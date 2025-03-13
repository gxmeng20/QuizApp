import React  from 'react'
import ReactDOM from 'react-dom/client';
import App from "./App.tsx"



function Main() {
    return (
        <App/>
        
    );
}   

var root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Main/>)
