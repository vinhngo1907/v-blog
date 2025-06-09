import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";

export default function RegisterForm() {
    const dispatch = useDispatch();
    let initState = {
        name: '', account: '', password: '', cf_password: ''
    }
    const [userRegister, setUserRegister] = useState(initState);
    const { name, account, password, cf_password } = userRegister
    const [typePass, setTypePass] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        dispatch(register(userRegister));
    }

    const handleChange = (e: any) => {
        setUserRegister({ ...userRegister, [e.target.id]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>

                <input type="text" className="form-control" id="name"
                    placeholder="Your name is up to 20 chars."
                    onChange={handleChange} name="name"
                    value={name}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="account" className="form-label">
                    Email / Phone number
                </label>
                <input
                    type="text" className="form-control"
                    id="account" placeholder="Example@gmail.com/+84374481936" name="account"
                    onChange={handleChange} value={account}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>

                <div className="pass">
                    <input type={typePass ? "password" : "text"}
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                    />
                    <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
                </div>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                    Confirm Password
                </label>
                <input type={typePass ? "password" : "text"}
                    className="form-control"
                    id="cf_password"
                    name="cf_password"
                    onChange={handleChange}
                    value={cf_password}
                />
                <small onClick={() => setTypePass(!typePass)}>{typePass ? "Hide" : "Show"}</small>
            </div>
        </form>
    )
}