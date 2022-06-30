// import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import { useState, useRef, useReducer } from 'react';
import CreateUser from './components/CreateUser';

// 6.24 useReducer()
//index.js에
//초기값 담아준거
const initialState = {
  //inputs와 users는 key! -> inputs는 value값으로 객체를 가지고 있고 users는  value값으로 배열을 가지고 있음
  inputs: {
    username:"",
    email:"",
  },
  users: [
    {
        id:1, 
        username:'green',
        email: 'green@gmail.com',
        active: false,
    },
    {
        id:2, 
        username:'blue',
        email: 'blue@gmail.com',
        active: false,
    },
    {
        id:3, 
        username:'yellow',
        email: 'yellow@gmail.com',
        active: false,
    },
  ]
} 
function reducer(state, action){
  switch(action.type){
    case "CHANGE_INPUT":
    return {                             //이런경우에 state가 변경될거다!
      ...state,
      inputs: {
        ...state.inputs,
        [action.name]: action.value
        //여기 .name은 -> username/email ->input태그에 넣은 name이름들!!
      }
    };               
    case "CREATE_USER":
    return {
      inputs: initialState.inputs,
      users: state.users.concat(action.user),         //state.users 는 맨위에 initialState안에 있는 users 배열임!! [{id:1 ~~ active: false,}]
      // users: [...state.users, action.user ]        //spread구문 써줘도 됨!! (위에랑 같은거!)
    };
    case "DELETE_USER":
    return {
      ...state,
      users: state.users.filter(user => user.id !== action.id)      //user.id와 action이 받아온 id만 다를 때, 제거해줘!
    };
    case "ACTIVE_USER":
    return {
      ...state,
      users: state.users.map(user=>
        user.id === action.id ? {...user, active: !user.active } : user )
    };
    default:
    return state;
  }
}

// useRef : 값 관리할 때 / DOM에서도 씀
function App() {
//❤6.24 useReducer로 상태관리  (✔useState로 한거를 다시 해보기!✔)
  const [ state, dispatch ] = useReducer(reducer, initialState);      //initialState라는 변수의 객체가 초기값으로 담기는거!
  //객체 구조분해할당
  const { users } = state;                //구조분해할당을 안하면, const users = state.users; 이렇게 됨 
  const { username, email } = state.inputs;
  const onChange = (e)=>{
    //input에는 name과 value값을 넣어주었음! 
    //구조분해할당 : 새로운 변수에 저 객체가 가지고 있는 값을 다시 넣어 주는거!!
    const { name, value } = e.target;
    //변경이 필요한 애들은 action개체에 담아주는거!
    dispatch({
      type:"CHANGE_INPUT",
      name: name,
      value: value
    })
  }
  const onCreate = ()=>{
    dispatch({
      type: "CREATE_USER",
      //user를 하나 추가해서 보내줘야함
      user: {
        id: nextId.current,
        username: username,       // 앞에 username는 그냥 key이름(string문자열)   : 뒤 username이 변수- 그래서 input에 담겨있는 값이 얘에 담겨있는거임!!
        email: email,             // 앞에 email은 그냥 key이름(string문자열)   : 뒤 email이 변수- 그래서 input에 담겨있는 값이 얘에 담겨있는거임!!
        // username과 email은 여기에 있음!! -> const { username, email } = state.inputs;  
      }
    })
    nextId.current += 1;
  }
  const nextId = useRef(4);
  const onDelete = (id)=>{
    dispatch({
      type: "DELETE_USER",
      id:id,           //id를 넘겨줘야 그래야 얘만 뺄 수 있음!
    })
  }
  const onToggle = (id) => {
    dispatch({
      type: "ACTIVE_USER",
      id:id,
    })
  }


  //❤useState()로 한거
  //CreateUser의 입력 인풋을 상태관리
  // const [ inputs, setInputs ] = useState({
  //   username:"",
  //   email:"",
  // });
  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]:value
  //   })
  //   console.log(inputs);
  // }
  // const { username, email } = inputs;

  //useState()실행 -> 배열 return
  //arr[0] = 상태
  //arr[1] = 상태를 변경해주는 function
  //useState(초기값) - 초기값으로 const users의 배열값들을 넣어줌!
  // const users = arr[0];
  // const setUsers = arr[1];
  // 위에 두개를 *구조분해할당*으로 한번에 보내주기
  //2.
  // const [ users, setUsers ] = useState([
  //   {
  //       id:1, 
  //       username:'green',
  //       email: 'green@gmail.com',
  //       active: false,
  //   },
  //   {
  //       id:2, 
  //       username:'blue',
  //       email: 'blue@gmail.com',
  //       active: false,
  //   },
  //   {
  //       id:3, 
  //       username:'yellow',
  //       email: 'yellow@gmail.com',
  //       active: false,
  //   },
  // ])
  // // 1.이렇게 따로 빼준걸 useSatate(초기값) 안에 초기값으로 넣어준다!!
  // // const users = [
  // //     {
  // //         id:1, 
  // //         username:'green',
  // //         email: 'green@gmail.com'
  // //     },
  // //     {
  // //         id:2, 
  // //         username:'blue',
  // //         email: 'blue@gmail.com'
  // //     },
  // //     {
  // //         id:3, 
  // //         username:'yellow',
  // //         email: 'yellow@gmail.com'
  // //     },
  // // ]

  // const nextId = useRef(4);
  // //배열에 새로운 항목을 추가하는 함수
  // //ref객체는 무조건 current로 접근!! -> .current
  // //users배열에 새로운 user객체를 추가
  // const onCreate = () => {
  //   //새로운 user객체 생성
  //   // const user = {
  //   //   id: nextId.current,
  //   //   username: username,       
  //   //   email: email,            
  //   // }
  //   const user = {
  //     id: nextId.current,
  //     username,           //key와 value 값이 같으면 -> username: username, 이걸 => username, 만 적어줘도 됨
  //     email,              //key와 value 값이 같으면 -> email: email, 이걸 => email, 만 적어줘도 됨
  //     active: false,
  //   }
  //   setUsers([...users,user]);        //배열합치기(concat써도 됨!) - 스프레드 구문 이용해서!
  //   //ex> const arr = [1,2,3,4,5];   arr = [...arr,6] => [1,2,3,4,5,6]과 같음!   / ... 배열의 값을 펼쳐놓음(스프레드 구문)
  //   setInputs({
  //     username:"",
  //     email:"",
  //   })
  // nextId.current += 1;
  // }
  //users배열에 해당 id는 삭제
  //filter -> 해당하는 id와 user객체의 id가 다른 객체만 새배열로 반환
  //삭제버튼 누를 때 onDelete함수 실행
  //부모요소에서 만들었지만 실행은 자식컴포넌트에서 실행되어야함 -> props를 통해!
  // const onDelete = (id) =>{
  //   setUsers(users.filter(user=> id !== user.id));
  // }
  // //클릭할 때, userstyle주기!(배경색)
  // const onToggle = (id)=>{
  //   //배열메서드 map(유저에 순차적인 값이 담김) user의 id와 id를 비교 -> active값을 true면 false / false면 true -> boolean데이터라서 !만 붙이면 true일 땐, false가 되고 false일 땐, true가 됨
  //   //배열을 하나씩 유저에 담아올거임! click했을 때 받아오는 id와 user id를 비교 / 같으면 user.active를 바꿔줘! / 다르다면 그냥 user 그대로!
  //   setUsers(users.map(user=> id===user.id ? {...user, active: !user.active} : user));
  // }
  return (
    <div className="App">
      {/* 자식에게 전달해주겠다~ */}
      <CreateUser email={email} username={username} onChange={onChange}
      onCreate={onCreate} />
      <UserList users={users} onDelete={onDelete} onToggle={onToggle} />
    </div>
  );
}

export default App;
