//rsc(함수형)
import React from 'react';

//props를 객체구조분해할당{username, email, onChange, onCreate}으로 함!
const CreateUser = ({username, email, onChange, onCreate}) => {
    return (
        <div>
            <input name="username" placeholder="이름" value={username}
            onChange={onChange} />
            <input name="email" placeholder="이메일" value={email}
            onChange={onChange} />
            <button onClick={onCreate}>등록</button>
        </div>
    );
};
//* php는 get이랑 post! react는 props로!!
// const CreateUser = (props) => {
//     return (
//         <div>
//             <input name='username' placeholder='이름' />
//             <input name='email' placeholder='이메일' />
//             <button>등록</button>
//         </div>
//     );
// };

export default CreateUser;