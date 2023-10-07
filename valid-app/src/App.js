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
        "Неверный логин. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание";
    } else if (target.value.length > 20) {
      newLoginError = "Неверный логин. Должно быть не больше 20 символов";
    } else if (target.value.length < 3) {
      newLoginError = "Неверный логин. Должно быть не меньше 3 символов";
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
    let newPasswordError = null;
    if (target.value.length < 6) {
      newPasswordError = "Неверный пароль. Должно быть не меньше 6 символов";
    } else if (target.value.length > 20) {
      newPasswordError = "Неверный пароль. Должно быть не больше 20 символов";
    } else if (!/^[a-zA-Z0-9]+$/.test(target.value)) {
      newPasswordError =
        "Неверный пароль. Допустимые символы: латинские буквы и цифры";
    }

    setErrorFormData({
      passwordError: newPasswordError,
    });
  };

  const onRepeatPasswordChange = ({ target }) => {
    setFormData({
      ...formData,
      repeatPassword: target.value,
    });
    let newRepeatPasswordError = null;
    if (target.value !== formData.password) {
      newRepeatPasswordError = "Пароли не совпадают";
    }

    setErrorFormData({
      repeatPasswordError: newRepeatPasswordError,
    })
  }


  return (
    <div className={style.app}>
      <header className={style.appHeader}>
        <form onSubmit={onSubmit}>
          {loginError && <div className={style.errorLabel}>{loginError}</div>}
          {passwordError && (
            <div className={style.errorLabel}>{passwordError}</div>
          )}
          {repeatPasswordError && <div className={style.errorLabel}>{repeatPasswordError}</div>}
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
            onChange={onPasswordChange}
          />

          <input
            type="password"
            placeholder="Повторите ваш пароль"
            value={repeatPassword}
            onChange={onRepeatPasswordChange}
          />

          <button
            type="submit"
            disabled={
              (!!loginError || !!passwordError || !!repeatPasswordError)
            }
          >
            Зарегистрироваться
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
