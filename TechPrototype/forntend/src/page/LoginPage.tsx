import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigator from '../components/Navigator';
import SnackBar from '../components/Snackbar';
import '../css/LoginInPage.css';
import { LoginResult, login } from '../service/auth';

const LoginPage: React.FC = () => {
    const loginRequestUrl = "http://jaccount.sjtu.edu.cn/oauth2/authorize?response_type=code&scope=profile&client_id=ov3SLrO4HyZSELxcHiqS&redirect_uri=http://localhost:3000/login";

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    const [loginResult, setLoginResult] = useState<LoginResult | null>(null);
    const [alert, setAlert] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchLogin = async () => {
            if (code) {
                const result = await login(code);
                setLoginResult(result);
                if (result.ok) {
                    navigate('/home');
                }
                else {
                    setAlert(true);
                }
            }
        };
        fetchLogin();
    }, [code]);

    console.log("code", code);
    console.log("login result", loginResult);

    return (
        <div>
            <Navigator></Navigator>
            <a href={loginRequestUrl} className="video-left-link"></a>
            <video className='home-bg' autoPlay loop muted>
                <source src="/assets/loginpage.mp4" type="video/mp4" />
            </video>
            <SnackBar
                open={alert}
                setOpen={setAlert}
                message="登录失败，请重试！"
            />
        </div>
    );
};

export default LoginPage;