import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AuthHeader from "../AuthHeader/AuthHeader";
import useFormValidation from '../../hooks/useFormValidation';
import * as mainApi from '../../utils/MainApi';
import { EMAIL_REGEX_PATTERN } from "../../utils/constants";

function Profile({ setLoggedIn, loadingErrorMessage, isLoadingSuccess, setLoadingSuccess, setLoadingErrorMessage, setLoadingError, editUserInfo, isLoading, setChecked, formValues,setFormValues }) {
    
    const [isProfileEdit, setProfileEdit] = useState(false)
    const [validation, handleValidation] = useFormValidation()
    const navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext)
    console.log(formValues)
    useEffect(() => {
        setLoadingSuccess(false)
        setLoadingError(false)
        setLoadingErrorMessage('')
    },[])
    
    const { isValid, errorMessage } = validation;

    const name = formValues['user-name'];
    const email = formValues['user-email'];
  
    const disabledButton = !isValid || (name === currentUser.name && email === currentUser.email) || isLoading

    const handleEditProfile = (evt) => {
        evt.preventDefault()

        setProfileEdit(true)
    };
    
    const handleChange = (evt) => {
        const { name, value } = evt.target

        setFormValues({
            ...formValues,
            [name]: value
        })

        setLoadingSuccess(false)
        setLoadingError(false)
        setLoadingErrorMessage('')
    }

    const handleLogout = () => {
        mainApi
            .logout()
            .then(() => {
                localStorage.clear()
                setLoggedIn(false)
                setChecked(false)
                navigate('/', { replace: true })
            }).catch((err) => {
                console.error(`Error: ${err.status} ${err.statusText}`)
            })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault() 

        editUserInfo(name, email)
    }

    return (
        <>
            <AuthHeader />
            <main>
                <section className="profile">
                    <form className="profile__form" onChange={handleValidation} noValidate onSubmit={handleSubmit}>
                        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
                        <div className="profile__name-container">
                            <label htmlFor="name" className="profile__name-label">Имя</label>
                            <input
                            className="profile__name-input" 
                            id='name'
                            name="user-name"
                            value={name}
                            onChange={handleChange}
                            disabled={!isProfileEdit}
                            // defaultValue='Андрей'
                            placeholder='Введите имя'
                            maxLength='40'
                            minLength='2'
                            required
                            />
                        </div>
                        <span className="register__error-text">
                            {errorMessage['user-name']}
                        </span>
                        <div className="profile__email-container">
                            <label htmlFor="email" className="profile__email-label">Email</label>
                            <input
                            className="profile__email-input" 
                            id='email'
                            name="user-email"
                            value={email}
                            onChange={handleChange}
                            disabled={!isProfileEdit}
                            // defaultValue='pochta@yandex.ru'
                            placeholder='Введите email'
                            maxLength='40'
                            minLength='2'
                            required
                            pattern={EMAIL_REGEX_PATTERN}
                            />
                        </div>
                        <span className="register__error-text">
                            {errorMessage['user-email']}
                        </span>
                        <div className="profile__handle-container">
                           {!isLoadingSuccess ? (
                            <span className="profile__error-msg">
                                {loadingErrorMessage}
                            </span>
                           ) :  <span className="profile__success-msg">
                                    Данные изменены!
                                </span>
                                }
                            {
                                isProfileEdit ? (
                                    <button className={`register__submit-btn ${disabledButton ? 'register__submit-btn_disabled' : ''}`} type="submit" disabled={disabledButton}>
                                        Сохранить
                                    </button>
                                ) : (
                                    <button className="profile__handle-edit" type="button" onClick={handleEditProfile}>
                                        Редактировать
                                    </button>
                                )
                            }
                            {
                                !isProfileEdit && (
                                    <button className="profile__handle-logout" type="button" onClick={handleLogout}>
                                        Выйти из аккаунта
                                    </button>

                                )
                            }
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile;