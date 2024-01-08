function AboutProject() {
    return (
      <section className="about-project" id="about-project">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__container">
          <h3 className="about-project__container_title about-project__container_title_stages">
            Дипломный проект включал 5 этапов
          </h3>
          <h3 className="about-project__container_title about-project__container_title_time">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__container_subtitle about-project__container_subtitle_stages">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p className="about-project__container_subtitle about-project__container_subtitle_time">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="about-project__timeline">
            <div className="about-project__timeline_title about-project__backend">
                <p className="about-project__timeline_subtitle">1 неделя</p>
            </div>
            <div className="about-project__timeline_title about-project__frontend">
                <p className="about-project__timeline_subtitle">4 недели</p>
            </div>
            <div className="about-project__timeline_text about-project__backend_sub">
                <p className="about-project__timeline_subtitle">Back-end</p>
            </div>
            <div className="about-project__timeline_text about-project__frontend_sub">
                <p className="about-project__timeline_subtitle">Front-end</p>
            </div>
        </div>
      </section>
    );
  }
  
  export default AboutProject;