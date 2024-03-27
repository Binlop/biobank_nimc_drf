import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import "./login.css"

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

    return (
        <div className='login-page'>
            <form onSubmit={loginUser}>
            {/* Login input */}
            <div className="form-outline mb-4">
                <input name="username" type="text" id="username" className="form-control" />
                <label className="form-label">Логин</label>
            </div>
            
            {/* Password input */}
            <div className="form-outline mb-4">
                <input name="password" type="password" id="password" className="form-control" />
                <label className="form-label">Пароль</label>
            </div>
            
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                {/* Checkbox */}
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"/>
                    <label className="form-check-label"> Запомнить меня </label>
                </div>
                </div>
            
                <div className="col">
                {/* Forgot password link */}
                <a href="#!">Забыли пароль?</a>
                </div>
            </div>
            
            {/* Submit button */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>
            
            <div className="text-center">
                <p>Нет аккаунта? Обратитесь к заведующему лабораторией</p>
            </div>
            </form>
        </div>
    )
}

export default LoginPage