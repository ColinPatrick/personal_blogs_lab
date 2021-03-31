import * as React from 'react';
import { json, User } from '../utils/api';
import { NewUser } from '../utils/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';


const Register: React.FC<RegisterProps> = props => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let newUser: NewUser = {
            name: name,
            email: email,
            password: password
        };

        if(User.userid == null) {
            json('/auth/register', 'POST', newUser);
            alert('Account has been created! Please sign in.');
            props.history.push('/login');
        } else {
            alert('You are currently signed in. Please sign out to create a new account.');
        }
    }

    return (
        <main className="container">
                <section className="row d-flex justify-content-center">
                    <div className="col-md-12 d-flex justify-content-center">
                        <h2 className="text-center text-primary">Register:</h2>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <form className="form-group p-3">
                        <label htmlFor="name" className="my-2">Name</label>
                            <input type="text" value={name} className="form-control form-control-lg my-2" id="name-input" onChange={e => setName(e.target.value)} />
                            <label htmlFor="email" className="my-2">Email</label>
                            <input type="text" value={email} className="form-control form-control-lg my-2" id="email-input" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="email" className="my-2">Password</label>
                            <input type="password" value={password} className="form-control form-control-lg my-2" id="pass-input" onChange={e => setPassword(e.target.value)} />
                            <div className="col-md-12 d-flex justify-content-end">
                                <button className="btn btn-primary my-3" onClick={ handleRegister }>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
    );
}

interface RegisterProps extends RouteComponentProps {}

export default withRouter (Register)