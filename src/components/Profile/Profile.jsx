import { Link } from "react-router-dom";
import AuthHeader from "../AuthHeader/AuthHeader";

function Profile() {
    return (
        <>
            <AuthHeader />
            <main>
                <section className="profile">
                    <form className="profile__form">
                        <h2 className="profile__title">Привет, Андрей!</h2>
                        <div className="profile__name-container">
                            <label htmlFor="name" className="profile__name-label">Имя</label>
                            <input
                            className="profile__name-input" 
                            id='name'
                            defaultValue='Андрей'
                            placeholder='Введите имя'
                            maxLength='20'
                            minLength='2'
                            required
                            />
                        </div>
                        <div className="profile__email-container">
                            <label htmlFor="email" className="profile__email-label">Email</label>
                            <input
                            className="profile__email-input" 
                            id='email'
                            defaultValue='pochta@yandex.ru'
                            placeholder='Введите email'
                            maxLength='20'
                            minLength='2'
                            required
                            />
                        </div>
                        <div className="profile__handle-container">
                            <button className="profile__handle-edit">
                                Редактировать
                            </button>
                            <button className="profile__handle-logout">
                                Выйти из аккаунта
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Profile;