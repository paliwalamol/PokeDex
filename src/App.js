import { useState } from 'react';
import './App.css';

function App() {
  const [inpt,setInput]  = useState("");
  const [but,SetButton]  = useState(true);
  const [res,setRes] = useState(null);
  const [err,setErr] = useState(null);

  const setInputfunc = (e)=>{
    console.log(e.target.value);
    setInput(e.target.value);
    if(e.target.value === ""){
      SetButton(true);
    }
    else{
    SetButton(false);
    }
  }
  const fetchData = (e) => {
    e.preventDefault();
    console.log("fetching data");
    fetch(`https://pokeapi.co/api/v2/pokemon/${inpt}`).then((res) => res.json()).then((data) => {
      console.log(data);
      setRes(data);  
    }
    ).catch((err) => {
      console.log(err);
      setErr(err);  
    });
    
}

  const setInitial = () => {
    console.log("setting initial");
    setInput("");
    SetButton(true);
    setRes(null);
    setErr(null);
  }

  return (
    <div className="App">

    <h1>PoKeDeX</h1>
    {!err && !res &&
      <>
      <form className="box">
      <input placeholder='Enter Pokemon name' className="inp" type="text" value={inpt} onChange={(e)=>setInputfunc(e)}/>
      <button className="btn" disabled={but} onClick={(e)=>fetchData(e)}>Submit</button>
      </form>
      </>
    }
      
    {!err && res && <div className='box'>
        <h4>Pokemon id:{res.id}</h4>
        <h3>Name:{res.name}</h3>
        <img src={res.sprites.front_default} className = 'image' alt="pokemon"/>
        
        <span>Pokemon height : {res.height} feet</span>
        <span>Pokemon weight : {res.weight} pounds</span>
        <hr/>
        <button className='btn' onClick={setInitial}>Back</button>
      </div> 
    }

    {err && <div className='box'>
      <h1>Something went wrong</h1>
      <button className='btn' onClick={setInitial}>Back</button>
    </div>
  }
  
  </div>
  );

}


export default App;
