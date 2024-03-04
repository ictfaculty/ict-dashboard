import React, { useState } from 'react'
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../store/features/auth/authSlice';
import { Form } from 'antd';


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [fillAuth, setFillAuth] = useState({
        username: '',
        password: ''
    })

    const isAuth = useSelector(state => state.auth.isAuth)
    const message = useSelector(state => state.auth.message)
    console.log(message);

    const handleLoginClick = () => {
        // Perform login action when the button is clicked
        dispatch(handleLogin(fillAuth, navigate));
    };

    const isFillAuthEmpty = !fillAuth.username || !fillAuth.password;


    return (
        <div className='min-h-[100vh] bg-[#4880FF] flex justify-center items-center'>
            <div className="w-[90%] md:w-[55%] lg:w-[32%] bg-[#fff] py-[50px] px-[27px] rounded-2xl flex flex-col gap-[40px]">
                <div className="text-center">
                    <h2 className='text-[21px] md:text-[31px] font-medium'>Войти в аккаунт</h2>
                    <p className='text-[#202224]'>Введите свой логин и пароль</p>
                </div>
                <div className="">
                    <p className='mb-4'><span className='text-[red]'>* </span>Логин:</p>
                    <Input
                        placeholder="@gmail.com"
                        className='h-[39px]'
                        value={fillAuth.username}
                        onChange={e => setFillAuth({ ...fillAuth, username: e.target.value })}
                    />
                </div>
                <div className="">
                    <div className="flex justify-between items-center">
                        <p className='mb-4'><span className='text-[red]'>* </span>Пароль:</p>
                        <p className='mb-4'>Забыть пароль?</p>
                    </div>
                    <Form.Item
                        type='password'
                        name="password"
                        value={fillAuth.password}
                        onChange={e => setFillAuth({ ...fillAuth, password: e.target.value })}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password 
                        className='h-[39px]'
                        placeholder='Password'
                        />
                    </Form.Item>

                    {/* <Input
                        placeholder="password"
                        className='h-[39px]'
                        type='password'
                        value={fillAuth.password}
                        onChange={e => setFillAuth({ ...fillAuth, password: e.target.value })}
                    /> */}
                </div>
                <p
                    style={{ fontWeight: '100' }}
                    className='text-center m-[-25px] text-[red]'
                >{message}</p>
                <div className="flex justify-center ">
                    <button

                        style={{ opacity: isFillAuthEmpty ? .3 : 1 }}
                        disabled={isFillAuthEmpty}
                        className='w-[80%] bg-[#4880FF] h-[40px] text-[#fff] rounded-lg hover:bg-[#4866ff] transition-[.5s] '
                        onClick={handleLoginClick}
                    >Войти</button>
                </div>

            </div>
        </div>
    )
}

export default Login
