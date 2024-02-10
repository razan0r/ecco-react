
import React from 'react'

function Input({id,name,title,type='text',onChange,errors,onBlur,touched,placeholder,customClass}) {
  return (
    <div className='form mb-3 mt-5 '>
      <label htmlFor={id} className='form-label'>{title}</label>
      <input type={type} name={name} className={`form-control ${customClass}`} id={id} onBlur={onBlur} onChange={onChange} placeholder={placeholder}/>
      {touched && touched[name] && errors && errors[name] && <p className='text text-danger'>{errors[name]}</p>}
    </div>
  )
}

export default Input
