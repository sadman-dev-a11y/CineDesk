import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
class Boundary extends React.Component<{children:React.ReactNode},{error:boolean}>{state={error:false};static getDerivedStateFromError(){return {error:true}}render(){return this.state.error?<main><h1>CineDesk could not load</h1><p>Your saved demo remains in this browser.</p><button onClick={()=>location.reload()}>Reload</button></main>:this.props.children}}
createRoot(document.getElementById('root')!).render(<Boundary><App/></Boundary>);
