import React, { Component, useState, useEffect } from 'react';

const App4 = (props) => {
    //클래스 컴포넌트 보이기
    const [funcShow, setFuncShow] = useState(true);
    console.log(funcShow);
    return (
        <div>
            <h1>Hello world</h1>
            <input type="button" value="클래스 컴포넌트 보이기/안보이기" onClick={()=>{ setFuncShow(!funcShow) }} />
            { funcShow && <ClassComp initNumber={2}/>}
            {/* &&논리연산자 - funcShow가 true면 <ClassComp initNumber={2}/>얘가 보이고 / false면  <ClassComp initNumber={2}/>얘가 안보임 */}
            {/* input -> onClick시, setFunShow의 값이 !funcShow이니까 값을 바꿔주는거(반대로) -> !funcShow라서 true면 false/ false면 true */}
        </div>
    );
};
//class컴포넌트 만들기
class ClassComp extends Component {
    //state생성
    //props값을 state값으로 지정
    state = {
        number: this.props.initNumber,
        date: new Date().toLocaleTimeString(),  
        //Date객체를 만들어 줌 -> date객체에서 쓸 수 있는 메서드 toLocaleTimeString()
    }
    //랜더가 끝난 다음 실행사이클 메서드
    componentDidMount() {
        console.log("class형 컴포넌트 => componentDidMount");
    }
    //컴포넌트 UnMount되기 직전 실행사이클 메서드
    componentWillUnmount(){
        console.log("class형 컴포넌트 => componentWillUnmount");
    }
    //*함수형 컴퍼넌트는 render가 없음-> 함수형컴퍼넌트 자체가 render임!
    //*클래스형 컴퍼넌트는 render가 필수 요소!
    render(){
        console.log("class형 컴포넌트 => render");
        return(
            <div className='container'>
                <h2>클래스 컴포넌트</h2>
                <p>Number : <span>{this.state.number}</span></p>
                <p>Date : <span>{this.state.date}</span></p>
            </div>
        )
    }

    //console창보기> 버튼 클릭시,
    //* 클래스 컴포넌트 보이기
    // render가 먼저 호출됨!
    // true
    // class형 컴포넌트 => render
    // class형 컴포넌트 => componentDidMount
    //* 클래스 컴포넌트 안보이기
    // false
    // class형 컴포넌트 => componentWillUnmount
}

export default App4;