import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation('home')
  return <>

    <div className="wrapper-showcase">
      {/* Showcase */}
      <section className="showcase">
        <div className="container">
          <div className="showcase__inner">
            <div className="showcase__info">
              <div className="showcase__content">
                <div className="showcase__text">
                  <img src="images-new/showcase-text.svg" alt="" />
                </div>
                <div className="showcase__desc">
                  {t('desc')}
                </div>
              </div>
              <div className="showcase__video">
                <video autoPlay loop muted id="vid">
                  <source src="vid-1.webm" />
                </video>
              </div>
            </div>
            <div className="showcase__items">
              <a href="#modal-first" data-fancybox className="showcase__item">
                <span className="showcase__span first"></span>
                <span className="showcase__span second"></span>
                <span className="showcase__span third"></span>
                <span className="showcase__span fourth"></span>

                <div className="showcase__item--info">
                  <span>Barter Smartplace</span>
                  <p>{t('mp')}</p>
                </div>
                <div className="showcase__more">
                  <span>{t('more')}</span>
                  <svg>
                    <use
                      xlinkHref="images-new/icons-sprite.svg#arrow-showcase"
                    ></use>
                  </svg>
                </div>
              </a>
              <a href="#modal-second" data-fancybox className="showcase__item">
                <span className="showcase__span first"></span>
                <span className="showcase__span second"></span>
                <span className="showcase__span third"></span>
                <span className="showcase__span fourth"></span>

                <div className="showcase__item--info">
                  <span>Barter P2P</span>
                  <p>{t('p2p')}</p>
                </div>
                <div className="showcase__more">
                  <span>{t('more')}</span>
                  <svg>
                    <use
                      xlinkHref="images-new/icons-sprite.svg#arrow-showcase"
                    ></use>
                  </svg>
                </div>
              </a>
              <a href="#modal-third" data-fancybox className="showcase__item">
                <span className="showcase__span first"></span>
                <span className="showcase__span second"></span>
                <span className="showcase__span third"></span>
                <span className="showcase__span fourth"></span>

                <div className="showcase__item--info">
                  <span>Barter Wallet Bot</span>
                  <p>{t('crypto')}</p>
                </div>
                <div className="showcase__more">
                  <span>{t('more')}</span>
                  <svg>
                    <use
                      xlinkHref="images-new/icons-sprite.svg#arrow-showcase"
                    ></use>
                  </svg>
                </div>
              </a>
              <a href="#modal-fourth" data-fancybox className="showcase__item">
                <span className="showcase__span first"></span>
                <span className="showcase__span second"></span>
                <span className="showcase__span third"></span>
                <span className="showcase__span fourth"></span>

                <div className="showcase__item--info">
                  <span>Barter Wallet</span>
                  <p>{t('phone')}</p>
                </div>
                <div className="showcase__more">
                  <span>{t('more')}</span>
                  <svg>
                    <use
                      xlinkHref="images-new/icons-sprite.svg#arrow-showcase"
                    ></use>
                  </svg>
                </div>
              </a>
              <a href="#modal-five" data-fancybox className="showcase__item">
                <span className="showcase__span first"></span>
                <span className="showcase__span second"></span>
                <span className="showcase__span third"></span>
                <span className="showcase__span fourth"></span>

                <div className="showcase__item--info">
                  <span>Barter Blockchain</span>
                  <p>{t('dpos')}</p>
                </div>
                <div className="showcase__more">
                  <span>{t('more')}</span>
                  <svg>
                    <use xlinkHref="images-new/icons-sprite.svg#arrow-showcase"></use>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* Crypts */}

    <section className="crypt">
      <div className="container">
        <div className="crypt__inner">
          <div className="crypt__info">
            <div className="crypt__img first">
              <img src="images-new/crypt-1.png" alt="" />
            </div>
            <div className="crypt__img second">
              <img src="images-new/crypt-2.png" alt="" />
            </div>
            <div className="crypt__img third">
              <img src="images-new/crypt-3.png" alt="" />
            </div>
            <div className="crypt__img fourth">
              <img src="images-new/crypt-4.png" alt="" />
            </div>
            <span className="showcase__span first"></span>
            <span className="showcase__span second"></span>
            <span className="showcase__span third"></span>
            <span className="showcase__span fourth"></span>
            <h3 className="crypt__title">{t('crypt-title')}</h3>
            <div className="crypt__text">
              {t('crypt-text')}
            </div>
            <div className="crypt__label">
              <img src="images-new/showcase-icon.svg" alt="" />
              <span>{t('crypt-label')}</span>
            </div>
          </div>
          <div className="crypt__items">
            <div className="crypt__item">
              <div className="crypt__icon">
                <img src="images-new/crypt-item-1.png" alt="" />
              </div>
              <div className="crypt__aside">
                <p>{t('crypt-1')}</p>
                <span>{t('crypt-2')}</span>
              </div>
            </div>
            <div className="crypt__item">
              <div className="crypt__icon after">
                <img src="images-new/crypt-item-2.png" alt="" />
              </div>
              <div className="crypt__aside">
                <p>{t('crypt-3')}</p>
                <span>{t('crypt-4')}</span>
              </div>
            </div>
            <div className="crypt__item">
              <div className="crypt__icon">
                <img src="images-new/crypt-item-3.png" alt="" />
              </div>
              <div className="crypt__aside">
                <p>{t('crypt-5')}</p>
                <span>{t('crypt-6')}</span>
              </div>
            </div>
            <div className="crypt__item">
              <div className="crypt__icon after">
                <img src="images-new/crypt-item-4.png" alt="" />
              </div>
              <div className="crypt__aside">
                <p>{t('crypt-7')}</p>
                <span>{t('crypt-8')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="nft" id="nft">
      <div className="container">
        <div className="nft__inner">
          <h3 className="nft__title">{t('nft-1')}</h3>
          <div className="nft__items">
            <div className="nft__item">
              <div className="nft__img">
                <img src="images-new/nft-1.png" alt="" />
              </div>
              <div className="nft__text">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <span>{t('nft-2')}</span>
                <div className="nft__aside">
                  <a
                    href="https://t.me/barteriants"
                    target="_blank"
                    className="modal__btn"
                  >
                    <span>{t('more')}</span>
                    <img src="images-new/modal-arrow.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="nft__item">
              <div className="nft__img">
                <img src="images-new/nft-2.png" alt="" />
              </div>
              <div className="nft__text">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <span>{t('nft-3')}</span>
                <div className="nft__aside">
                  <a
                    href="https://t.me/barteriants"
                    target="_blank"
                    className="modal__btn"
                  >
                    <span>{t('more')}</span>
                    <img src="images-new/modal-arrow.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="nft__item">
              <div className="nft__img">
                <img src="images-new/nft-3.png" alt="" />
              </div>
              <div className="nft__text">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <span>{t('nft-4')}</span>
                <div className="nft__aside">
                  <a
                    href="https://t.me/barteriants"
                    target="_blank"
                    className="modal__btn"
                  >
                    <span>{t('more')}</span>
                    <img src="images-new/modal-arrow.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="nft__item">
              <div className="nft__img">
                <img src="images-new/nft-4.png" alt="" />
              </div>
              <div className="nft__text">
                <div className="showcase__span third"></div>
                <div className="showcase__span fourth"></div>
                <span>{t('nft-5')}</span>
                <div className="nft__aside">
                  <a
                    href="https://t.me/barteriants"
                    target="_blank"
                    className="modal__btn"
                  >
                    <span>{t('more')}</span>
                    <img src="images-new/modal-arrow.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Listing */}

    <section className="listing" id="listing">
      <div className="container">
        <div className="listing__inner">
          <div className="listing__content">
            <div className="showcase__span first"></div>
            <div className="showcase__span second"></div>
            <div className="showcase__span third"></div>
            <div className="showcase__span fourth"></div>
            <h3 className="listing__title">{t('list-1')}</h3>
            <ul className="listing__list">
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('list-2')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('list-3')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('list-4')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span
                >{t('list-5')}</span>
              </li>
            </ul>
            <a href="https://t.me/dprolix" target="_blank" className="modal__btn">
              <span>{t('more')}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          </div>
          <div className="listing__img">
            <img src="images-new/listing-img.png" alt="" />
          </div>
        </div>
      </div>
    </section>

    {/* Comun */}

    <section className="comun">
      <div className="container">
        <div className="comun__inner">
          <div className="showcase__span first"></div>
          <div className="showcase__span second"></div>
          <div className="showcase__span third"></div>
          <div className="showcase__span fourth"></div>
          <div className="comun__img">
            <img src="images-new/comun.png" alt="" />
          </div>
          <div className="comun__info">
            <h3 className="listing__title">{t('comun-1')}:</h3>
            <ul className="listing__list">
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('comun-2')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('comun-3')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('comun-4')}</span>
              </li>
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t('comun-5')}</span>
              </li>
            </ul>
            <div className="comun__text">
              {t('comun-6')}
            </div>
            <a
              href="https://vk.com/bartersmartplace"
              target="_blank"
              className="modal__btn"
            >
              <span>{t('more')}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Media */}

    <section className="media">
      <div className="container">
        <div className="media__inner">
          <h3 className="media__title nft__title">{t('colab')}</h3>
          <div className="media__items">
            <a
              href="https://www.certik.com/projects/bartercompany#audit"
              target="_blank"
              className="media__item wide"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-1.png" alt="" />
            </a>
            <a
              href="https://sberunity.ru/profile/4316941f-ab0e-43bc-8b1e-896f29174df0"
              target="_blank"
              className="media__item wide"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-2.png" alt="" />
            </a>
            <a
              href="https://t.me/msk_innoagency/889"
              target="_blank"
              className="media__item wide"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-3.png" alt="" />
            </a>
            <a
              href="https://vk.com/bartersmartplace?w=wall-207875362_2945"
              target="_blank"
              className="media__item wide"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-4.png" alt="" />
            </a>
          </div>
          <div className="media__items media__items--cols">
            <a
              href="https://www.certik.com/projects/bartercompany#audit"
              target="_blank"
              className="media__item mobile"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-1.png" alt="" />
            </a>
            <a
              href="https://sberunity.ru/profile/4316941f-ab0e-43bc-8b1e-896f29174df0"
              target="_blank"
              className="media__item mobile"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-2.png" alt="" />
            </a>
            <a
              href="https://t.me/msk_innoagency/889"
              target="_blank"
              className="media__item mobile"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-3.png" alt="" />
            </a>
            <a
              href="https://vk.com/bartersmartplace?w=wall-207875362_2945"
              target="_blank"
              className="media__item mobile"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-4.png" alt="" />
            </a>
            <a
              href="https://velas.com/en/ecosystem/barter-smartplace"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-5.png" alt="" />
            </a>
            <a href="https://envelop.is" className="media__item" target="_blank">
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-6.png" alt="" />
            </a>
            <a
              href="https://dzen.ru/media/cryptozhuk/xpnetwork-predostavliaet-krosschein-nftmost-dlia-smartleis-61f7ba230f33552b49a5e7a3"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-7.png" alt="" />
            </a>
            <a
              href="https://t.me/msk_innoagency/889"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-8.png" alt="" />
            </a>
            <a
              href="https://t.me/msk_innoagency/889"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-9.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="media media-new">
      <div className="container">
        <div className="media__inner">
          <h3 className="media__title nft__title">{t('media')}</h3>
          <div className="media__items media__items--cols">
            <a
              href="https://wiki.hyperledger.org/display/RU/Smart-contracts+as+a+legal+primary+source"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-10.png" alt="" />
            </a>
            <a
              href="https://news.bitcoin.com/dex-barter-smartplace-launch-a-new-era-of-nft-trade/"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-11.png" alt="" />
            </a>
            <a
              href="https://decenter.org/ceo-barter-smartplace-interview/"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-12.png" alt="" />
            </a>
            <a
              href="https://maff.io/smart_contracts"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-13.png" alt="" />
            </a>
            <a
              href="https://t.me/ProRock_Crypto/354"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-14.png" alt="" />
            </a>
            <a
              href="https://ixbt.market/item/bartersmartplace/blog/"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-15.png" alt="" />
            </a>
            <a
              href="https://thehdgr.com/@Barter"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-16.png" alt="" />
            </a>
            <a
              href="https://vk.com/news_ethereum"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-17.png" alt="" />
            </a>
            <a
              href="https://vk.com/crypto.party"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-18.png" alt="" />
            </a>
            <a
              href="https://vk.com/darkwebex"
              className="media__item"
              target="_blank"
            >
              <div className="showcase__span first"></div>
              <div className="showcase__span second"></div>
              <div className="showcase__span third"></div>
              <div className="showcase__span fourth"></div>
              <img src="images-new/col-19.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* track */}

    <section className="media media-track">
      <div className="container">
        <div className="media__inner">
          <h3 className="media__title nft__title">{t('track')}</h3>
          <div className="media-track__items">
            <a
              href="https://dappradar.com/binance-smart-chain/marketplaces/barter-smartplace"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-1.png" alt="" />
            </a>
            <a
              href="https://www.dextools.io/app/ru/polygon/pair-explorer/0xf3a183a826a4f27fc7183df7282defd5c13eb7c5?t=1712743466147"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-2new.png" alt="" />
            </a>
            <a
              href="https://coinmarketcap.com/currencies/barter/"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-3.png" alt="" />
            </a>
            <a
              href="https://www.coingecko.com/en/coins/barter"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-4.png" alt="" />
            </a>
            <a
              href="https://crypto.com/price/barter"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-5.png" alt="" />
            </a>
            <a
              href="https://www.coinbase.com/ru/price/barter"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-6.png" alt="" />
            </a>
            <a
              href="https://www.binance.com/en/price/barter"
              className="media-track__item"
              target="_blank"
            >
              <img src="images-new/track-7.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* feedback */}

    <section className="feedback">
      <div className="container">
        <div className="feedback__inner">
          <h3 className="feedback__title mobile">{t('write')}</h3>

          <div className="feedback__items">
            <div className="feedback__info">
              <h3 className="feedback__title desktop">{t('write')}</h3>
              <form className="feedback__form">
                <input type="hidden" name="project_name" value="Barter 4.0" />
                <input type="hidden" name="project_name" value="Barter 4.0" />
                <label className="field">
                  <span className="field__label">{t('email')}</span>
                  <input type="text" placeholder="Е-mail" name="email" />
                </label>
                <label className="field">
                  <span className="field__label">{t('msg')}</span>
                  <textarea placeholder="Сообщение" name="message"></textarea>
                </label>
                <button type="button" className="feedback__btn modal__btn" id="home-feedback__btn">
                  <span>{t('send')}</span>
                  <img src="images-new/modal-arrow.svg" alt="" />
                </button>
              </form>
            </div>
            <div className="feedback__img">
              <img src="images-new/feedback-img.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
}

export default Home
