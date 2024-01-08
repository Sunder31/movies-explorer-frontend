import student from '../../images/student.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className='about-me__title'>Студент</h2>
      <div className="about-me__student">
          <h3 className="about-me__student_title">Андрей</h3>
          <p className="about-me__student_subtitle">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__student_bio">
            Работал внештатным видеооператором в телекомпании города Лобня. 2 года работал в издательстве &apos;Русское Слово&apos; на должности
            младшего технического специалиста. Имею опыт видеосъемки, видеомонтажа, работы с фотошопом.
            Учусь на Фронтенд-разработчика в Яндекс Практикум.
          </p>
          <a
            className="about-me__student_link"
            href="https://github.com/Sunder31"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        <img className="about-me__student_photo" src={student} alt="Фото студента" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;