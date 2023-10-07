import { useState } from "react";
import style from "./App.module.css";

const sendFormData = (registrationData) => {
  console.log(registrationData);
};

function App() {
  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });

  const [errorFormData, setErrorFormData] = useState({
    loginError: null,
    passwordError: null,
    repeatPasswordError: null,
  });

  const { login, password, repeatPassword } = formData;

  const { loginError, passwordError, repeatPasswordError } = errorFormData;

  const onSubmit = (evt) => {
    evt.preventDefault();
    sendFormData({ login, password, repeatPassword });
  };

  const onloginChange = ({ target }) => {
    setFormData({
      ...formData,
      login: target.value,
    });
    let newLoginError = null;
    if (!/^[\w_]*$/.test(target.value)) {
      newLoginError =
        "Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание";
    } else if (target.value.length > 20) {
      newLoginError = "Неверный логин. Должно быть не больше 20 символов";
    }

    setErrorFormData({
      loginError: newLoginError,
    });
  };

  const onPasswordChange = ({ target }) => {
    setFormData({
      ...formData,
      password: target.value,
    });
  };

  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <form onSubmit={onSubmit}>
          {loginError && <div className={style.errorLabel}>{loginError}</div>}
          <input
            type="text"
            placeholder="Введите ваш логин"
            value={login}
            onChange={onloginChange}
          />

          <input
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={({ target }) => {
              setFormData({
                ...formData,
                password: target.value,
              });
            }}
          />

          <input
            type="password"
            placeholder="Повторите ваш пароль"
            value={repeatPassword}
            onChange={({ target }) => {
              setFormData({
                ...formData,
                repeatPassword: target.value,
              });
            }}
          />

          <button type="submit" disabled={!!loginError}>
            Зарегистрироваться
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
