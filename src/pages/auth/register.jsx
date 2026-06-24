import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../../data/auth";
export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
      };

      register(newUser).then((res) => {
        if (res.token) {
          setToken(res.token);
          navigate("/home");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="box">
                <h1 className="title has-text-centered">Escape Game Social</h1>
                <p className="subtitle has-text-centered">Create an account</p>

                <form onSubmit={handleRegister}>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                          <input
                            className="input is-rounded"
                            type="text"
                            placeholder="First name"
                            ref={firstName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="column">
                      <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                          <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Last name"
                            ref={lastName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="text"
                        placeholder="Choose a username"
                        ref={username}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input is-rounded"
                        type="email"
                        placeholder="Enter your email"
                        ref={email}
                      />
                    </div>
                  </div>

                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input is-rounded"
                            type="password"
                            placeholder="Password"
                            ref={password}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="column">
                      <div className="field">
                        <label className="label">Verify Password</label>
                        <div className="control">
                          <input
                            className="input is-rounded"
                            type="password"
                            placeholder="Verify password"
                            ref={verifyPassword}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Bio</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Tell us about yourself..."
                        ref={bio}
                      />
                    </div>
                  </div>

                  <div className="field is-grouped is-grouped-centered mt-4">
                    <div className="control">
                      <button
                        className="button is-rounded"
                        style={{
                          backgroundColor: "#51e2f5",
                          borderColor: "#51e2f5",
                          color: "#333",
                        }}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="control">
                      <Link
                        to="/login"
                        className="button is-rounded"
                        style={{
                          backgroundColor: "#ffa8b6",
                          borderColor: "#ffa8b6",
                          color: "#333",
                        }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>

                <dialog ref={passwordDialog}>
                  <p>Passwords do not match. Please try again.</p>
                  <button
                    className="button is-rounded mt-2"
                    style={{
                      backgroundColor: "#51e2f5",
                      borderColor: "#51e2f5",
                      color: "#333",
                    }}
                    onClick={() => passwordDialog.current.close()}
                  >
                    Close
                  </button>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
