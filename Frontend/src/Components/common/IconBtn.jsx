import React from 'react'

const IconBtn = ({text,onClick,children,disabled,type}) => {
  return (
    <div>

<button disabled={disabled} onClick={onClick} type={type}>
    {
        children ?  (
            <div>
                <span>
            {text} 
        </span>
        {children}
        
            </div>
        ) : ({text})
    }
</button>
    </div>
  )
}

export default IconBtn