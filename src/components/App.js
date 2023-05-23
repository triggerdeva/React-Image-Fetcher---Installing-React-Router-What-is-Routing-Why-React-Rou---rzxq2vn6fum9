import React, { useState } from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';
const App = () => {
    const [state, setState] = useState({
        title: '',
        url:'',
        loaderDisplay: false,
    });
    
    const inputHandler =(e)=>{
        let value = e.target.value;
        // if(!value) return;
        setState({
            ...state,
            loaderDisplay: true,
        })
        fetch('https://jsonplaceholder.typicode.com/photos/'+value)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            // console.log(data);
            setState({
                title: data.title,
                url: data.url,
                loaderDisplay: false,
            })
        })
        .catch((error)=> console.log(error))
    }
  return (
    <div className='App'>
        <label htmlFor='id-number'>Id number </label>
        <input onChange={inputHandler} id='id-number' type={'number'} min={1} max={5000} />
        {state.loaderDisplay ? <Loader /> :
        state.title ? <PhotoFrame url={state.url} title={state.title} /> : console.log(state.title)}
    </div>
  )
}


export default App;
