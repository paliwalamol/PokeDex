import { useState ,useEffect} from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemon] = useState([]);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=905')
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.results);
      });
  }, []);
      
  const [inpt,setInput]  = useState("");
  const [but,SetButton]  = useState(true);
  const [res,setRes] = useState(null);
  const [err,setErr] = useState(null);
  const [load,setLoad] = useState(false);
  const [iload,setILoad] = useState(true);

  

  const setInputfunc = (e)=>{
    
    setInput(e.target.value);
    
    if(e.target.value === ""){
      SetButton(true);
    }
    else{
    SetButton(false);
    }
  }
  const fetchData = (e) => {
    setLoad(true);
    if(e)e.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${inpt}`).then((res) => res.json()).then((data) => {
      setRes(data);  
      setLoad(false);
    }
    ).catch((err) => {
      setErr(err); 
      setLoad(false); 
    });
    
}

  const setInitial = () => {
    setInput("");
    SetButton(true);
    setRes(null);
    setErr(null);
    setILoad(true);
    
  }
  
  return (
    <div className="App">

    <h1>PoKeDeX</h1>
    {!err && !res &&
      <>
      <form className="box">
      {load===true && 
        <div className="loader"></div>   
      }
      <input placeholder='Enter Pokemon name' className="inp" type="text" value={inpt} onChange={(e)=>setInputfunc(e)}/>
      {pokemons?.filter((pokemon)=>{
        if(inpt === "" || inpt===pokemon.name)return null;
        else if(pokemon?.name?.toLowerCase().startsWith(inpt?.toLowerCase())){
          return pokemon;
        }
        
      })?.map((pokemon,key) => {
        return key<6 && 
        (
          <div className='pokemons' key={key} onClick={(e)=>{setInput(pokemon.name)}}>{pokemon.name}</div>
        );
        
      
      })}
      <button className="btn" disabled={but} onClick={(e)=>fetchData(e)}>Submit</button>
      </form>
      </>
    }
      
    {!err && res && <div className='box'>
        
        <h4>Pokemon id:{res.id}</h4>
        <h3>Name:{res.name}</h3>
        {iload===true && 
          <div className="loader"></div>   
        }
        <img src={res.sprites.front_default} className = 'image' alt="pokemon" onLoad={()=>setILoad(false)}/>
        
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
