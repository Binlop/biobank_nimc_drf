import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import "./login.css"

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)

    return (
        <div className='login-page'>
            <form onSubmit={loginUser}>
            {/* Login input */}
            <div class="form-outline mb-4">
                <input name="username" type="text" id="username" class="form-control" />
                <label class="form-label" for="form2Example1">Логин</label>
            </div>
            
            {/* Password input */}
            <div class="form-outline mb-4">
                <input name="password" type="password" id="password" class="form-control" />
                <label class="form-label" for="form2Example2">Пароль</label>
            </div>
            
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                {/* Checkbox */}
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="form2Example31" />
                    <label class="form-check-label" for="form2Example31"> Запомнить меня </label>
                </div>
                </div>
            
                <div class="col">
                {/* Forgot password link */}
                <a href="#!">Забыли пароль?</a>
                </div>
            </div>
            
            {/* Submit button */}
            <button type="submit" class="btn btn-primary btn-block mb-4">Войти</button>
            
            <div class="text-center">
                <p>Нет аккаунта? Обратитесь к заведующему лабораторией</p>
            </div>
            </form>
        </div>
    )
}

export default LoginPage