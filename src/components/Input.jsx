import React from 'react'

const Input = React.forwardRef(function Input({
   label,
   type = "text",
   className = "",
   placeholder,
   ...props
},ref) {
   return (
      <div className={`w-full `}>
         {label && <label className='inline-block mb-2 pl-2'>
            {label}
         </label>}
         <input
            type={type}
            className={` px-3 py-2 rounded-lg  bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            placeholder={placeholder}
            {...props}
         />
      </div>
   )
});


export default Input
