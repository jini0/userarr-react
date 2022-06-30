import React, { useState } from 'react';
import Timer from './components/Timer';

const App3 = (props) => {
    const [ showTimer, setShowTimer ] = useState(false);
    return (
        <div>
            { showTimer && <Timer/> }
            <button onClick={()=>{ setShowTimer(!showTimer) }}>클릭하세요</button>
                                                {/* boolean데이터 앞에 !(not)붙이면-> false면 true/ true면 false */}
        </div>
    );
};

export default App3;