import {Link} from 'react-router-dom';
import "../styles/password.scss";


function Password() {    
  
    return(
        <div className='password'>
            <div className='password_form'>
                <div className='logo'>
                        <span className='yellow'>B</span>
                        <span className='blue'>M</span>
                        <span className='yellow'>ee</span>
                        <span className='blue'>t</span>
                </div>
                <div className='forgot_pass'>
                    Забыли пароль?
                </div>
                <div className='in_mail'>
                    Пожалуйста, введите ваш email и следуйте инструкции в письме
                </div>
                <form action="#">
                <div className='head_emaill'>
                    Email 
                </div>
                <input className='input_class_emaill' type="email" placeholder="bmeet@gmail.com" required></input>
                <button type='submit' className='pass_in'><p className='en'>Сбросить пароль</p></button>
            </form>
                <Link className='log_in' to='/'> &lt; Авторизоваться </Link>
            </div>
        </div>
    )

}

export default Password;