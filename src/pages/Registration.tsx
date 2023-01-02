import React from 'react';

const Registration = () => {
  return (
      <div className={'mainGrid'}>
        <div>Registration</div>
        <input placeholder={'text'} type="text"/>
        <input placeholder={'email'} type="email"/>
        <input placeholder={'password'} type="text"/>
        <button>Submit</button>
      </div>
  );
};

export default Registration;