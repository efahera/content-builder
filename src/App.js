import React from 'react'; 
import ContentBuilder from './ContentBuilder'; 
import './App.css'; 
 
function App() { 
  return ( 
    <div className="App"> 
      <div style={{fontSize: '30px', backgroundColor: 'rgb(211, 211, 211)', padding: '20px'}}><b>Drag & Drop Content Builder</b></div> 
      <ContentBuilder /> 
    </div> 
  ); 
} 
 
export default App;