import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authAction";

const LoginPass = () => {
    const [userLogin, setUserLogin] = useState({
        account: "",
        password: ""
    });
    const dispatch = useDispatch();
    const { account, password } = userLogin;
    const [typePass, setTypePass] = useState(false);
    const handleChangeInput = (e: any) => {
        setUserLogin({ ...userLogin, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(login(userLogin));
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="account" className="form-label">
                    Email / Phone number
                </label>
                <input type="text" value={account} onChange={handleChangeInput}
                    className="form-control" id="account"
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <div className="pass">
                    <input type={typePass ? "text" : "password"}
                        value={password}
                        onChange={handleChangeInput}
                        className="form-control" id="password"
                    />
                    <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
                </div>
            </div>
            <button type="submit" className="btn btn-dark w-100 mt-1"
                disabled={(account && password) ? false : true}>
                Login
            </button>
        </form>
    )
}

export default LoginPass;