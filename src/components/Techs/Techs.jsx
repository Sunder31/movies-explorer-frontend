function Techs() {
    return (
      <section className="techs" id="techs">
        <h2 className='techs__title'>Технологии</h2>
        <h3 className="techs__section-title">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__cards">
          <li className="techs__card_item">HTML</li>
          <li className="techs__card_item">CSS</li>
          <li className="techs__card_item">JS</li>
          <li className="techs__card_item">React</li>
          <li className="techs__card_item">Git</li>
          <li className="techs__card_item">Express.js</li>
          <li className="techs__card_item">mongoDB</li>
        </ul>
      </section>
    );
  }

  export default Techs;