
import {Link} from 'react-router-dom';
import "../styles/login.scss";
import {useParams} from 'react-router-dom'



function Login() {

    return(
         <div className='login'>
            <div className='login_form'>
                <div className='logo'>
                    <span className='yellow'>B</span>
                    <span className='blue'>M</span>
                    <span className='yellow'>ee</span>
                    <span className='blue'>t</span>
                </div>
                <div className='welcome'>
                    Добро пожаловать!
                </div>
                <div className='in'>
                    Пожалуйста, войдите в Ваш аккаунт
                </div>
                <form action="/board/:id">
                <div className='head_email'>
                    Email 
                </div>
                <input className='input_class_email' type="email" placeholder="bmeet@gmail.com" required></input>
                <div className='head_password'>
                    Пароль
                </div>
                <Link className='pass' to='/recpassword'>Забыли пароль?</Link>
                <input className='input_class_pass' type="password" required></input>
                <button type='submit' className='entr'><p className='en'>Войти</p></button>
                </form>
                <div className='head_reg'>Впервые на платформе?</div>
                <Link className='reg' to='/register'>Создать аккаунт</Link>
            </div>
        </div>
    );
}

export default Login;