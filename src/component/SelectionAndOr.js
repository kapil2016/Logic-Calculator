import './Selection.css'
import SelectionMenu from './SelctionMenu'
import { useState } from 'react';

function generateRandomId() {
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    const id = randomString + timestamp;
    return id;
  }

const SelectionAndOr = (props) => {
    const {args , opration , setResult , result} = props;
  
    const[ops , setOps] = useState(opration)
    const arrItems = [{id : generateRandomId() , item:<SelectionMenu args = {args} setResult={setResult} result={result}  opration={ops}></SelectionMenu>},
    {id : generateRandomId() , item:<SelectionMenu args = {args} setResult={setResult} result={result}  opration={ops}></SelectionMenu>}
    ]
    const [items , setItems] = useState(arrItems)

  
    const cancleOprationHandler = ()=>{
        props.selection('select')
    }

    const oprationChangeHandler = (e)=>{
            const oprt = e.target.value ;
            console.log(oprt)
            setOps(oprt)
    }

    const addOprationHandler = ()=>{
        setItems([...items , {item:<SelectionMenu args = {args} setResult={setResult} result={result}  opration={ops}></SelectionMenu>}])
    }

    return (
        <>
            <div className="container-logic-selecteor">
                <select value={ops} onChange={(e)=>oprationChangeHandler(e)}>
                    <option value='and'>
                        and
                    </option>
                    <option value='or'>
                        or
                    </option>
                </select>
                <button onClick={cancleOprationHandler}>X</button>
            </div>
            {items.map((element)=><div key={element.id}>{element.item}</div>)}
            <button onClick={addOprationHandler}>+add ops</button>

        </>
    )
}

export default SelectionAndOr;