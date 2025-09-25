import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation('about')
  return (
    <div>
      <div className="wrapper-showcase about-wrapper">
        <div className="showcase-about">
          <div className="container">
            <div className="showcase-about__inner">
              <div className="showcase-about__info">
                <h3 className="showcase-about__title title">
                  {t('top')}
                </h3>
                <div className="showcase-about__text">
                  {t('we')}
                </div>
                <a
                  href="https://t.me/dprolix"
                  target="_blank"
                  className="modal__btn"
                >
                  <span>{t('buy')}</span>
                  <img src="images-new/modal-arrow.svg" alt="" />
                </a>
              </div>
              <div className="showcase-about__img">
                <img src="images-new/about-show.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program */}

      <div className="program">
        <div className="container">
          <div className="program__inner">
            <div className="program__info">
              <h3 className="program__title">{t('program')}</h3>
              <div className="program__text">
                {t('program-1')}
                <a href="https://www1.fips.ru/fips_servl/fips_servlet?DB=EVM&DocNumber=2022663202&TypeFile=html">{t('program-2')} </a> {t('program-3')}
              </div>
            </div>
            <div className="program__content">
              <div className="program__image first">
                <img src="images-new/prog-1.png" alt="" />
              </div>
              <div className="program__image second">
                <img src="images-new/prog-2.png" alt="" />
              </div>
              <div className="program__image third">
                <img src="images-new/prog-3.png" alt="" />
              </div>
              <div className="program__image fourth">
                <img src="images-new/prog-4.png" alt="" />
              </div>
              <div className="listing__content">
                <div className="showcase__span first"></div>
                <div className="showcase__span second"></div>
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <h3 className="listing__title">{t('program-4')}</h3>
                <ul className="listing__list">
                  <li>
                    <img src="images-new/showcase-icon.svg" alt="" />
                    <span
                    >{t('program-5')}</span>
                  </li>
                  <li>
                    <img src="images-new/showcase-icon.svg" alt="" />
                    <span>
                      {t('program-6')}
                    </span>
                  </li>
                  <li>
                    <img src="images-new/showcase-icon.svg" alt="" />
                    <span
                    >{t('program-7')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Func */}

      <div className="func">
        <div className="container">
          <div className="func__inner">
            <div className="showcase__span first"></div>
            <div className="showcase__span second"></div>
            <div className="showcase__span third"></div>
            <div className="showcase__span fourth"></div>
            <div className="func__info">
              <h3 className="func__title">{t('func-1')}</h3>
              <ul className="listing__list">
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-2')}
                  </span>
                </li>
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-3')}
                  </span>
                </li>
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-4')}
                  </span>
                </li>
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-5')}
                  </span>
                </li>
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-6')}
                  </span>
                </li>
                <li>
                  <img src="images-new/showcase-icon.svg" alt="" />
                  <span>
                    {t('func-7')}
                  </span>
                </li>
              </ul>
            </div>
            <div className="func__img">
              <img src="images-new/func-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Adva */}

      <div className="adva">
        <div className="container">
          <div className="adva__inner">
            <h3 className="adva__title">{t('adva-1')}</h3>
            <div className="adva__items">
              <div className="adva__item">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <div className="adva__img">
                  <img src="images-new/adva-1.png" alt="" />
                </div>
                <div className="adva__text">
                  {t('adva-2')}
                </div>
              </div>
              <div className="adva__item">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <div className="adva__img">
                  <img src="images-new/adva-2.png" alt="" />
                </div>
                <div className="adva__text">
                  {t('adva-3')}
                </div>
              </div>
              <div className="adva__item">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <div className="adva__img">
                  <img src="images-new/adva-3.png" alt="" />
                </div>
                <div className="adva__text">
                  {t('adva-4')}
                </div>
              </div>
            </div>
            <div className="adva__label">
              <img src="images-new/showcase-icon.svg" alt="" />
              <span
              >{t('adva-5')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buy */}

      <div className="buy">
        <div className="container">
          <div className="buy__inner">
            <h3 className="buy__title">{t('buy-1')}</h3>
            <form className="feedback__form">
              <div className="buy__info">
                <div className="buy__area">
                  <span className="field__label">{t('buy-2')}</span>
                  <label className="field">
                    <textarea placeholder="Сообщение" name="message"></textarea>
                  </label>
                </div>
                <div className="buy__fields">
                  <span className="field__label">{t('buy-3')}</span>
                  <label className="field">
                    <input type="text" placeholder="Е-mail" name="email" />
                  </label>
                  <label className="field">
                    <input type="text" placeholder="Телефон" name="phone" />
                  </label>
                  <label className="field">
                    <input type="text" placeholder="ФИО" name="fullName" />
                  </label>
                </div>
              </div>
              <button type="button" className="feedback__btn modal__btn" id="about-feedback__btn">
                <span>{t('buy-4')}</span>
                <img src="images-new/modal-arrow.svg" alt="" />
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About
