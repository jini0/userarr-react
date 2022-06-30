import React, { useEffect } from 'react';

const Timer = (props) => {
    //Mount할 때 호출 componentDidMount
    //UnMount할 때 호출 componentWillUnmount
    //Update할 때 호출 componentDidUpdate
    useEffect(()=>{
        const timer = setInterval(()=>{
            //1초에 한 번씩 setInterval 안의 함수가 실행됨
            console.log('타이머 돌아가는중....');
        },1000)
        //return 안에는 언마운트 될 때 호출!
        //->그래서 언마운트될때 clearInterval도 됨! (타이머 멈춤)
        return ()=>{
            clearInterval(timer);
        }
    },[])
    return (
        <div>
            타이머를 실행합니다.
        </div>
    );
};

export default Timer;