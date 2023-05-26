import { useReducer, useState } from 'react';
import SelectionArgsConst from './component/SelectionArgsConst';
import './App.css'
import SelectionAndOr from './component/SelectionAndOr';


const initialstate = {
  args: [{ name: 'MyArg', value: 'false' }]
}


const reducer = (state, action) => {
  if (action.type === 'add-arg') {
    const arr = [...state.args, action.payload]
    return { ...state, args: arr }
  } else if (action.type === 'edit-arg-name') {
    const arr = [...state.args];
    arr.forEach((item, index) => {
      if (item.name === action.payload.id) {
        arr[index].name = action.payload.value;
      }
    })
    return { ...state, args: arr }
  } else if (action.type === 'edit-arg-value') {
    const arr = [...state.args];
    arr.forEach((item, index) => {
      if (item.name === action.payload.id) {
        arr[index].value =action.payload.value;
      }
    })
    return { ...state, args: arr }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)
  const [selection , setSelection] = useState('select')
  const [result , setResult] = useState(undefined)

  const options = ['constant' , 'argument' , 'and' , 'or']
  const optionsList = {
    constant:[{name:'true' , value: 'true'} , {name:'false' , value:'false'}] ,
    argument:state.args
  }


  const addArgument = () => {
    dispatch({ type: 'add-arg', payload: { name: 'newarg', value: 'false' } })
  }
  const editArgumentName = (e, id) => {
    dispatch({ type: 'edit-arg-name', payload: { id: id, value: e.target.value } })
  }
  const editArgumentValue = (e, id) => {
    dispatch({ type: 'edit-arg-value', payload: { id: id, value: e.target.value } })
  }


  const selectionHandler=(e)=>{
      const val = e.target.value ;
      console.log(val)
      setSelection(val)
  }
  const uiHandler = ()=>{
      const options = optionsList[selection]
      if(selection === 'constant'|| selection === 'argument'){
        return <SelectionArgsConst args={state.args}  options={options} setResult={(res)=>resultHandler(res)} result={result} selection={(val)=>setSelection(val)}></SelectionArgsConst>
      }else if(selection === 'and' || selection === 'or'){
        return <SelectionAndOr args={state.args} selection={(val)=>setSelection(val)} opration={selection} result={result}  setResult={(res)=>resultHandler(res)}></SelectionAndOr>
      }
  }

  const resultHandler = (res)=>{
      setResult(res)
  }
  return (
    <>
      <div className='container'>
        {state.args.map((item) => <div key={item.name} className='container-args'>
          <input value={item.name} onChange={(e) => editArgumentName(e, item.name)}></input>
          <select value={item.value} onChange={(e) => editArgumentValue(e, item.name)}>
            <option value='true'>
              true
            </option>
            <option value='false'>
              false
            </option>
          </select>
        </div>)}
        <button onClick={addArgument}> add args</button>

      { selection==='select' &&  <div className='container-logic-selecteor'>
            <select value={selection} onChange={(e)=>selectionHandler(e)} >
              <option disabled>
                select
              </option>
              {options.map((item) =><option key={item} value={item}>{item}</option>)}
            </select>
            <button> X </button>
        </div>}

        {selection!=='select' && uiHandler()}

        <h6> Result: {result}</h6>
      </div>
      
    </>
  );
}

export default App;
