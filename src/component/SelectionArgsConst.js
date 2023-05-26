import './Selection.css'
import { useEffect, useMemo, useState } from 'react';

const SelectionArgsConst = (props)=>{
    const{setResult , options , opration} = props ;
    
    const [selection , setSelaction] = useState(options[0].name)

    const selectionHandler = (e)=>{
        const val = e.target.value
        setSelaction(val)
        
    }
 const res = useMemo(()=>{
    let res = '' ; 
    options.forEach((item,index) => {
        if(item.name ===selection){
            res = options[index].value
        }
    });
    return res
 },[options,selection])
    
  useEffect(()=>{
    setResult((preResult)=>{
        console.log(preResult)
        console.log(res)
        if(!opration){
            return res ;
        }
        if(preResult){
            if(opration === 'and'){
                let ans = preResult === 'true' && res === 'true'
                console.log(ans)
                return ans + ''
            }
            if(opration === 'or'){
                let ans = preResult === 'true' || res === 'true'
                return ans + ''
            }
        }else{
            return res ;
        }
       
        
    })
  },[opration , res , setResult])



    console.log(opration)

    const buttonclickHandler = ()=>{
        props.selection('select')
        setResult(undefined)
    }

    return(
        <>
          <div className="container-logic-selecteor">
          <select value={selection} onChange={(e)=>selectionHandler(e)} >
             {options.map((item)=><>
             <option key={item.name} value={item.name}>{item.name}</option>
             </>)}
            </select>
            <button onClick={buttonclickHandler}> X </button>
          </div>
        </>
    )
}

export default SelectionArgsConst ;