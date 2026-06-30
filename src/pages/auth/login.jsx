import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setToken } from "../../data/auth";

export const Login = ({onLogin}) => {
  const username = useRef()
  const password = useRef()
  const [error, setError] = useState(null);
  const [isUnsuccessful, setIsUnsuccessful] = useState(false)

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value
    }

    login(user).then(res => {
      if (res.token) {
        setToken(res.token)
        localStorage.setItem("is_admin", false)
        navigate("/home")
      } else {
        setIsUnsuccessful(true)
      }
    })
  };

  return (

        <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <div className="box">
                <h1 className="title has-text-centered">Escape Game Social</h1>
                <p className="subtitle has-text-centered">Please sign in</p>

                <form onSubmit={handleLogin}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Enter your username"
                        ref={username}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="password"
                        placeholder="Enter your password"
                        ref={password}
                      />
                    </div>
                  </div>

                  {isUnsuccessful && (
                    <p className="help is-danger mb-3">Username or password not valid</p>
                  )}

                  <div className="field is-grouped is-grouped-centered mt-4">
                    <div className="control">
                      <button
                        className="button is-rounded"
                        style={{ backgroundColor: "#51e2f5", borderColor: "#51e2f5", color: "#333" }}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="control">
                      <Link
                        to="/register"
                        className="button is-rounded"
                        style={{ backgroundColor: "#ffa8b6", borderColor: "#ffa8b6", color: "#333" }}
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

