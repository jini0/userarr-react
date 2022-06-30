//rsc 엔터
import React, { useEffect } from 'react';
import './UserStyle.css';

//*구조분해할당
//컴포넌트로 만들어서! 한꺼번에 적용해주기
const User = ({user, onDelete, onToggle}) => {            //UserList가 User에게 전달!(UserList에 먼저 onDelete / onToggle등 달아줘야함) -> 최종적으로 User에서 삭제하는거임!
    useEffect(()=>{
        //useEffect는 인자로 callback함수 넣어주면 됨
        console.log('컴포넌트가 화면에 나타남');
        return ()=>{
            //return안에 있는 애가 언마운트될 때 실행되는 애
            console.log('컴포넌트가 화면에서 사라짐');
        }
    },[])   //두번째 인자로 [빈배열]넣어준거
    return (
        <div>
            {/* 자바스크립트 쓸거라 {중괄호}사용 */}
            {/* 논리연산자&& : 하나라도 false면 끝남! true일 때만 'active'까지 갈 수 있음 */}
            {/* &&조건문 -> false면 user.active */}
            {/* <span className={user.active && 'active'}> */}
            {/* <span className={user.active ? "active" : null}> */}
            <span className={user.active ? "active" : ""} onClick={()=>{ onToggle(user.id) }}>
            유저네임 : {user.username}
            이메일 : {user.email}
            </span>
            <button onClick={()=>{              //이 버튼 누를 때, onDelete가 실행! (바로 적어줄 수 없어서 함수를 이용해서 onDelete해주는 거임!)
                onDelete(user.id);              //user의 id에 따라!
            }}>삭제</button>
        </div>
    )
}
// const User = (props) => {
//     const {user} = props;
//     return (
//         <div>
//             유저네임 : {user.username}
//             <span>이메일 : {user.email}</span>
//         </div>
//     )
// }

const UserList = ({users, onDelete, onToggle}) => {
// const UserList = (props) => {
// //*App.js에 넣어주기! -> 
    // const users = [
    //     {
    //         id:1, 
    //         username:'green',
    //         email: 'green@gmail.com'
    //     },
    //     {
    //         id:2, 
    //         username:'blue',
    //         email: 'blue@gmail.com'
    //     },
    //     {
    //         id:3, 
    //         username:'yellow',
    //         email: 'yellow@gmail.com'
    //     },
    // ]
    return (
        <div>
            {/* 3. 배열메서드를 이용해서  */}
            {/* ✔자바스크립트 이용해줄거라서 {중괄호}에 넣어주기 */}
            {/* key라는 속성을 지정해주지 않으면 "key" prop.이라고 error가 뜸 -> key를 id로 접근하고자함 */}
            {/* ()소괄호 쓴거는 묶어주려고 하나뿐이니까 소괄호 없어도 됨 -> {users.map(user => <User user={user} key={user.id}/> )}*/}
            {users.map(user => (<User user={user} key={user.id} onDelete={onDelete} onToggle={onToggle} /> ))}


            {/* 2. component 사용 */}
            {/* <User user={users[0]}/>
            <User user={users[1]}/>
            <User user={users[2]}/> */}
            {/* 배열의 0번째 1번째 2번째 */}


            {/* 1. 무식하게 하나씩 다 적어주기 */}
            {/* <div>
                유저네임 : {users[0].username}
                <span>이메일 : {users[0].email}</span>
            </div>
            <div>
                유저네임 : {users[1].username}
                <span>이메일 : {users[1].email}</span>
            </div>
            <div>
                유저네임 : {users[2].username}
                <span>이메일 : {users[2].email}</span>
            </div> */}
        </div>
    );
};

export default UserList;