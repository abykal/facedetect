import React from 'react';


const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='light-purple f3'>
                {`${name}, your current rank is ...`}
            </div>
            <div className='purple f1'>
                {entries}
            </div>
        </div>
    )
}

export default Rank;