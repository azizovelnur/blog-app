import React, {FC} from 'react';
import {useForm} from 'react-hook-form'
import {useFetchAuthMutation} from "../store/login/loginApi";
const Login: FC = () => {

  const [addPost, {isSuccess}] = useFetchAuthMutation()

  const {register, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div className={'mainGrid'}>
      <div>Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={'email'} type="email" {...register('email', {required: 'need your email'})}/>
        <input placeholder={'password'} type="text"{...register('password', {required: 'need your password'})} />
        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};

export default Login;