import './Selection.css'
import { useState } from 'react';
import SelectionAndOr from './SelectionAndOr';
import SelectionArgsConst from './SelectionArgsConst';

const SelectionMenu = (props) => {
    const{setResult , opration , args , result} = props ;
    const [selection, setSelection] = useState('select')
    const options = ['constant', 'argument', 'and', 'or']
    
    const optionsList = {
        constant:[{name:'true' , value: 'true'} , {name:'false' , value:'false'}] ,
        argument:props.args
      }

    const selectionHandler = (e) => {
        const val = e.target.value;
        console.log(val)
        setSelection(val)
    }
  
    const uiHandler = ()=>{
        const options = optionsList[selection]
        if(selection === 'constant'|| selection === 'argument'){
          return <SelectionArgsConst args={args} options={options} setResult={setResult} result={result} opration={opration}  selection={(val)=>setSelection(val)}></SelectionArgsConst>
        }else if(selection === 'and' || selection === 'or'){
          return <SelectionAndOr args={args}  selection={(val)=>setSelection(val)} opration={selection} setResult={setResult} result={result} ></SelectionAndOr>
        }
    }


    return (
        <>
            {selection === 'select' && <div className='container-logic-selecteor'>
                <select value={selection} onChange={(e) => selectionHandler(e)} >
                    <option disabled>
                        select
                    </option>
                    {options.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
                <button> X </button>
            </div>}

            {selection !== 'select' && uiHandler()}
        </>
    )
}

export default SelectionMenu;