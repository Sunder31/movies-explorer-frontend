import portfolioArrow from '../../images/portfolio__arrow.svg';

function Portfolio() {
    return (
      <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__container">
        <li className="portfolio__item">
          <a
            className="portfolio__item_link"
            href="https://sunder31.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__item_name">Статичный сайт</p>
            <img
              className="portfolio__arrow-img"
              src={portfolioArrow}
              alt="переход на страницу с конкретным сайтом"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__item_link"
            href="https://sunder31.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__item_name">Адаптивный сайт</p>
            <img
              className="portfolio__arrow-img"
              src={portfolioArrow}
              alt="переход на страницу с конкретным сайтом"
            />
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__item_link"
            href="https://sunder31.github.io/mesto/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__item_name">
              Одностраничное приложение
            </p>
            <img
              className="portfolio__arrow-img"
              src={portfolioArrow}
              alt="переход на страницу с конкретным сайтом"
            />
          </a>
        </li>
      </ul>
      </>
    );
  }
  
  export default Portfolio;