import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            'Oops! That page doesn\'t exist!': 'Oops! That page doesn\'t exist!',
            'For some unbelievable reason this page is not on the site. Try visiting the others.': 'For some unbelievable reason this page is not on the site. Try visiting the others.',
            'Return to main page': 'Return to main page',
            'less than a minute ago': 'less than a minute ago',
            'minutes ago': 'minutes ago',
            'hours ago': 'hours ago',
            'Profile' : 'Profile',
            'Add new review' : 'Add new review',
            'Some text': 'Some text',
            'Sign out': 'Sign out',
            'Authorization': 'Authorization',
            'Registration': 'Registration',
            "ANIME": "ANIME",
            "GAME": "GAME",
            "BOOK": "BOOK",
            "MOVIE": "MOVIE",
            "SERIES": "SERIES",
            "CARTOON": "CARTOON",
            "OTHERS": "OTHERS",
            'average': 'average',
            'Enter your email address...': 'Enter your email address...',
            'Enter your password...': 'Enter your password...',
            'Enter your name...': 'Enter your name...',
            'Sign up': 'Sign up',
            'Log in': 'Log in',
            'No account?': 'No account?',
            'Got an account?': 'Got an account?',
            "Search": "Search",
            'Choose the type of artwork': 'Choose the type of artwork',
            'Submit review': 'Submit review',
            "The name of your artwork": "The name of your artwork",
            "The name of your review": "The name of your review",
            "Score": "Score",
            'Comments:': 'Comments:',
            'Write your opinion here...': 'Write your opinion here...',
            'Popular reviews': 'Popular reviews',
            'Recent reviews': 'Recent reviews',
            'Choose the language': 'Choose the language',


        }
    },
    fr: {
        translation: {
            'Oops! That page doesn\'t exist!': 'Oups ! Cette page n\'existe pas !',
            'For some unbelievable reason this page is not on the site. Try visiting the others.':'Pour une raison incroyable, cette page ne figure pas sur le site. Essayez de visiter les autres.',
            'Return to main page': 'Retour à la page principale',
            'less than a minute ago': 'il y a moins d\'une minute',
            'minutes ago': 'il y a quelques minutes',
            'hours ago': 'il y a quelques heures',
            'Profile' : 'Profil',
            'Add new review' : 'Ajouter un nouvel avis',
            'Some text': 'Some text',
            'Sign out': 'Sortir',
            'Authorization': 'Autorisation',
            'Registration': 'Inscription',
            "ANIME": "ANIME",
            "GAME": "JEU",
            "BOOK": "LIVRE",
            "MOVIE": "FILM",
            "SERIES": "SÉRIES",
            "CARTOON": "CARTOON",
            "OTHERS": 'AUTRES',
            'average': 'moyenne',
            'Enter your email address...': 'Entrez votre adresse e-mail...',
            'Enter your password...': 'Entrez votre mot de passe...',
            'Enter your name...': 'Entrez votre nom...',
            'Sign up': 'S\'inscrire',
            'Log in': 'Se connecter',
            'No account?': 'Pas de compte ?',
            'Got an account?': 'Vous avez un compte ?',
            "Search": "Recherche",
            'Choose the type of artwork': 'Choisir le type d\'œuvre',
            'Submit review': 'Soumettre un avis',
            "The name of your artwork": "Le nom de votre œuvre",
            "The name of your review": "Le nom de votre revue",
            "Score": "Le score",
            'Comments:': 'Commentaires:',
            'Write your opinion here...': 'Ecrivez votre opinion ici...',
            'Popular reviews': 'Revue de presse',
            'Recent reviews': 'Examens récents',
            'Choose the language': 'Choisir la langue',

        }
    },
    ру: {
        translation: {
            'Oops! That page doesn\'t exist!': 'Упс! Этой страницы не существует!',
            'For some unbelievable reason this page is not on the site. Try visiting the others.':'По какой-то невероятной причине эта страница отсутствует на сайте. Попробуйте посетить другие.',
            'Return to main page': 'Вернуться на главную страницу',
            'less than a minute ago': 'менее минуты назад',
            'minutes ago': 'минут назад',
            'hours ago': 'час(ов) назад',
            'Profile' : 'Профиль' ,
            'Add new review' : 'Добавить новый обзор',
            'Some text': 'Some text',
            'Sign out': 'Выйти',
            'Authorization': 'Авторизация',
            'Registration': 'Регистрация',
            "ANIME": "АНИМЕ",
            "GAME": "ИГРЫ",
            "BOOK": "КНИГИ",
            "MOVIE": "ФИЛЬМЫ",
            "SERIES": "СЕРИАЛЫ",
            "CARTOON": "МУЛЬТФИЛЬМЫ",
            "OTHERS": "ДРУГОЕ",
            'average': 'среднее',
            'Enter your email address...': 'Введите адрес электронной почты...',
            'Enter your password...': 'Введите пароль...',
            'Enter your name...': 'Введите свое имя...',
            'Sign up': 'Зарегистрироваться',
            'Log in': 'Войти',
            'No account?': 'Нет аккаунта?',
            'Got an account?': 'У вас есть аккаунт?',
            "Search": "Поиск",
            'Choose the type of artwork': 'Выберите тип произведения',
            'Submit review': 'Отправить обзор',
            "The name of your artwork": "Название вашего произведения",
            "The name of your review": "Название вашего обзора",
            "Score": "Оценка",
            'Comments:': 'Комментарии:',
            'Write your opinion here...': 'Напиши здесь свое мнение...',
            'Popular reviews': 'Популярные обзоры',
            'Recent reviews': 'Последние обзоры',
            'Choose the language': 'Выберите язык',

        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
