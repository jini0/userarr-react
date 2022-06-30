import React, { useEffect, useState } from 'react';

const App2 = (props) => {
    const [ count, setCount ] = useState(1);
    const [ input, setInput ] = useState("");
    //1. *아무것도 인자를 주지 않으면 -> componentDidMount && componentDidUpdate 두개다 됨
    //이렇게 하면 계에에속 호출됨(다 호출됨)
    useEffect(()=>{
        console.log('랜더링 될 때마다 useEffect호출');
    })

    //2. *빈배열을 주면 -> useEffect에 두번째 인자로 []을 넘겨주면 마운트될 때만 호출됨 (마운트될 때만 호출)
    //*componentDidMount 만 됨 
    useEffect(()=>{
        console.log('처음 마운트 될 때만 useEffect호출');
    },[])       //2번째 인자->감시할 애/ 두번째 인자로 [빈배열]비어있는 애를 주면 감시할 게 없음-> 마운트될 때만 호출되고 update될 때는 호출되지 않음! ❤

    //3. *count가 변경될 때만 호출
    useEffect(()=>{
        console.log('배열요소 안의 값이 업데이트 되면 useEffect호출');
    },[count])       
    const handleCount = ()=>{
        setCount(count+1);
    }
    const onChange = (e)=>{
        setInput(e.target.value);
    }
    return (
        <div>
            <button onClick={handleCount}>수정하기</button>
            <span>count: {count}</span>
            <input onChange={onChange} value={input} />
        </div>
    );
};

export default App2;