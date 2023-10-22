import './portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>

      <ul className="portfolio__items">
        <li className="portfolio__item">
          <p className="portfolio__subtitle">Статичный сайт</p>
          <a className="link portfolio__link" href="https://github.com/MotoPeter" >           
          </a>
        </li>
        <li className="portfolio__item">
        <p className="portfolio__subtitle">Адаптивный сайт</p>
          <a className="link portfolio__link" href="https://github.com/MotoPeter/russian-travel">
          </a>
        </li>
        <li className="portfolio__item">
        <p className="portfolio__subtitle">Одностраничное приложение</p>
          <a className="link portfolio__link" href="https://github.com/MotoPeter/react-mesto-api-full-gha">           
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;