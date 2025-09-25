import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Stake from './Stake'
import DocumentMeta from 'react-document-meta'
import './translations'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = 'f5873e23d6f3dd9dbd77a6bb908144af'

// 2. Set chains

// 3. Create a metadata object
const metadata = {
  name: 'Barter Company',
  description: 'Barter Company',
  url: 'https://barter.company', // origin must match your domain & subdomain
  icons: ['https://barter.company/']
}

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com/',
  rpcUrl: 'https://rpc.ankr.com/polygon/e39cbd764389a712a1c2ea10ef806f57ed21934ee26aa0ee59873eb1e37b03e6',
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: 'https://rpc.ankr.com/polygon/e39cbd764389a712a1c2ea10ef806f57ed21934ee26aa0ee59873eb1e37b03e6', // used for the Coinbase SDK
  defaultChainId: 137, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [polygon],
  projectId,
  // enableAnalytics: true // Optional - defaults to your Cloud configuration
})


export default function App() {
  const { t } = useTranslation('common')
  const meta = {title: t('title')}

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DocumentMeta {...meta} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="stake" element={<Stake />} />
          <Route path="*" element={<Navigate to='/' />}/>
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  const { t } = useTranslation('common')
  return (
    <div className="wrapper">
      <section className="header">
        <div className="container">
          <div className="header__inner">
            <a href="/" className="header__logo">
              <img src={`images-new/logo-${i18next.language}.svg`} alt="" />
            </a>
            <div className="header__content">
              <div className="header__close">
                <img src="images-new/close.svg" alt="" />
              </div>
              <ul className="header__nav">
                <li>
                  <a href="stake">
                    <span>{t('stake')}</span>
                  </a>
                </li>
                <li>
                  <a href="about">
                    <span>{t('about')}</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>{t('mplace')}</span>
                    <svg>
                      <use
                        xlinkHref="images-new/icons-sprite.svg#arrow-head"
                      ></use>
                    </svg>
                  </a>
                  <ul className="header__dropdown">
                    <li>
                      <a
                        href="https://smartplace.barter.company/search"
                        target="_blank"
                      >{t('buy')}</a >
                    </li>
                    <li>
                      <a
                        href="https://smartplace.barter.company/register"
                        target="_blank"
                      >{t('create')}</a>
                    </li>
                    <li>
                      <a
                        href="https://smartplace.barter.company/register"
                        target="_blank"
                      >{t('swap')}
                      </a>
                    </li>
                    <li>
                      <a href="#nft">{t('promo')}</a>
                    </li>
                    <li>
                      <a href="#listing">{t('list')}</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>P2P</span>
                    <svg>
                      <use
                        xlinkHref="images-new/icons-sprite.svg#arrow-head"
                      ></use>
                    </svg>
                  </a>
                  <ul className="header__dropdown">
                    <li>
                      <a href="https://p2p.barter.company/" target="_blank"
                      >{t('exchange')}</a>
                    </li>
                    <li>
                      <a
                        href="https://p2p.barter.company/trading"
                        target="_blank"
                      >{t('crypto')}</a>
                    </li>
                    <li>
                      <a
                        href="https://p2p.barter.company/trading"
                        target="_blank"
                      >{t('sell')}</a>
                    </li>
                    <li>
                      <a className="section" href="#listing">{t('become')}</a>
                    </li>
                    <li>
                      <a className="section" href="#listing">{t('list')}</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">
                    <span>{t('tokens')}</span>
                    <svg>
                      <use
                        xlinkHref="images-new/icons-sprite.svg#arrow-head"
                      ></use>
                    </svg>
                  </a>
                  <ul className="header__dropdown">
                    <li>
                      <a
                        href="https://coinmarketcap.com/currencies/barter/"
                        target="_blank"
                      >Barter [BRTR]
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://vc.ru/u/1084151-barter-smartplace/525522-tokenomika-barter-rub-kak-rabotaet-i-gde-ispolzovat"
                        target="_blank"
                      >Barter RUB [BRUB]</a>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="header__social">
                <li>
                  <a href={i18next.language === 'rus' ? 'https://t.me/barteriants' : 'https://t.me/barterteam'} target="_blank">
                    <img src="images-new/telega.svg" alt="" />
                  </a>
                </li>
                <li>{ i18next.language === 'rus'
                ?
                  <a href="https://vk.com/bartersmartplace" target="_blank">
                    <img src="images-new/vk.svg" alt="" />
                  </a>
                :
                  <a href="https://twitter.com/barterteam" target="_blank">
                    <img width="25" height="25" src="images-new/twitter.svg" alt="" />
                  </a>
                }</li>
              </ul>

              <div className="header__language">
                <div className="header__choose">
                  <div className="header__icon">
                    <img src={`images-new/${i18next.language}.svg`} alt="" />
                  </div>
                  <div className="header__text">{i18next.language}</div>
                  <div className="header__arrow">
                    <svg>
                      <use xlinkHref="images-new/icons-sprite.svg#arrow-head" ></use>
                    </svg>
                  </div>
                </div>
                <div onClick={()=>i18next.changeLanguage(i18next.language === 'rus' ? 'eng'  :'rus')}
                  className="header__language--dropdown">
                  <img src={`images-new/${i18next.language === 'rus' ? 'eng'  :'rus'}.svg`} alt="" />
                  <span>{i18next.language === 'rus' ? 'eng'  :'rus'}</span>
                </div>
              </div>
            </div>
            <div className="header__mobile">
              <ul className="header__social">
                <li>
                  <a href={i18next.language === 'rus' ? 'https://t.me/barteriants' : 'https://t.me/barterteam'} target="_blank">
                    <img src="images-new/telega.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://vk.com/bartersmartplace" target="_blank">
                    <img src="images-new/vk.svg" alt="" />
                  </a>
                </li>
              </ul>
              <div className="header__burger">
                <img src="images-new/burger.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Outlet />

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__left">
              <a href="/" className="footer__logo">
                <img src="images-new/footer-logo.svg" alt="" />
              </a>
              <span className="footer__copy"
              >{t('footer-copy')}</span>
            </div>
            <div className="footer__center">
              <ul className="footer__list">
                <li>
                  <a href="https://smartplace.barter.company">{t('footer-mp')}</a>
                </li>
                <li><a href="https://p2p.barter.company/">P2P</a></li>
                <li><a href={`https://barter.company/pdf/${(i18next.language === 'rus' ? 'WP_Barter_2023_RUS_c' :'BARTER_WP1')}.pdf`}>White Paper</a></li>
              </ul>
              <ul className="footer__list">
                <li>
                  <a href="https://smartplace.barter.company"
                  >Barter Smartplace</a>
                </li>
                <li><a href="https://p2p.barter.company/">Barter P2P</a></li>
                <li>
                  <a href="https://t.me/barterwalletbot">Barter Wallet</a>
                </li>
              </ul>
            </div>
            <div className="footer__right">
              <span>{t('social')}</span>
              <ul className="footer__social">
                <li>
                  <a href="https://vk.com/bartersmartplace" target="_blank">
                    <img src="images-new/vk-footer.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href={i18next.language === 'rus' ? 'https://t.me/barteriants' : 'https://t.me/barterteam'} target="_blank">
                    <img src="images-new/telega-footer.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/barterteam" target="_blank">
                    <img src="images-new/twitter.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://medium.com/bartersmartplace" target="_blank">
                    <img src="images-new/medium.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a href="https://dzen.ru/cryptozhuk" target="_blank">
                    <img src="images-new/dzen.svg" alt="" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://vc.ru/u/1084151-barter-smartplace"
                    target="_blank"
                  >
                    <img src="images-new/vc.svg" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal-thanks */}

      <div className="modal modal-thanks" id="modal-thanks">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <h3 className="modal-thanks__title">{t('modal-0-1')}</h3>
        <div className="modal-thanks__text">
          {t('modal-0-2')}
        </div>
        <div className="modal-thanks__btn modal__btn" data-fancybox-close>
          <span>{t('modal-0-3')}</span>
        </div>
      </div>

      {/* Modal modal-first */}

      <div className="modal" id="modal-first">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <div className="modal__close" data-fancybox-close>
          <img src="images-new/close.svg" alt="" />
        </div>
        <div className="modal__inner">
          <div className="modal__text">
            <div className="modal__text--item">{t('modal-1-1')}</div>
          </div>
          <div className="modal__info">
            <h3 className="modal__title">Barter Smartplace</h3>
            <div className="modal__desc">{t('modal-1-2')}</div>
            <div className="modal__items">
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-1.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-1-3')}
                  </div>
                </div>
              </div>
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-2.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-1-4')}
                  </div>
                </div>
              </div>
            </div>
            <a href="https://smartplace.barter.company/" className="modal__btn">
              <span>{t('modal-1-5')}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal modal-second */}

      <div className="modal" id="modal-second">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <div className="modal__close" data-fancybox-close>
          <img src="images-new/close.svg" alt="" />
        </div>
        <div className="modal__inner">
          <div className="modal__text">
            <div className="modal__text--item">{t('modal-2-1')}</div>
          </div>
          <div className="modal__info">
            <h3 className="modal__title">Barter P2P</h3>
            <div className="modal__desc">{t('modal-2-2')}</div>
            <div className="modal__items">
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-3.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-2-3')}
                  </div>
                </div>
              </div>
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-4.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-2-4')}
                  </div>
                </div>
              </div>
            </div>
            <a href="https://p2p.barter.company" className="modal__btn">
              <span>{t('modal-2-5')}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      {/* Modal modal-third */}

      <div className="modal" id="modal-third">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <div className="modal__close" data-fancybox-close>
          <img src="images-new/close.svg" alt="" />
        </div>
        <div className="modal__inner">
          <div className="modal__text">
            <div className="modal__text--item">{t('modal-3-1')}</div>
          </div>
          <div className="modal__info">
            <h3 className="modal__title">Barter Wallet Bot</h3>
            <div className="modal__desc">{t('modal-3-2')}</div>
            <div className="modal__items">
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-5.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-3-3')}
                  </div>
                </div>
              </div>
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-6.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-3-4')}
                  </div>
                </div>
              </div>
            </div>
            <a href="https://t.me/barterwalletbot?start=p_11" className="modal__btn">
              <span>{t('modal-3-5')}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
      {/* Modal modal-fourth */}

      <div className="modal" id="modal-fourth">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <div className="modal__close" data-fancybox-close>
          <img src="images-new/close.svg" alt="" />
        </div>
        <div className="modal__inner">
          <div className="modal__text">
            <div className="modal__text--item">{t('modal-4-1')}</div>
          </div>
          <div className="modal__info">
            <h3 className="modal__title">Barter Wallet</h3>
            <div className="modal__desc">{t('modal-4-2')}</div>
            <div className="modal__items">
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-7.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-4-3')}
                  </div>
                </div>
              </div>
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-8.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-4-4')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal modal-five */}

      <div className="modal" id="modal-five">
        <span className="showcase__span first"></span>
        <span className="showcase__span second"></span>
        <span className="showcase__span third"></span>
        <span className="showcase__span fourth"></span>
        <div className="modal__close" data-fancybox-close>
          <img src="images-new/close.svg" alt="" />
        </div>
        <div className="modal__inner">
          <div className="modal__text">
            <div className="modal__text--item">{t('modal-5-1')}</div>
          </div>
          <div className="modal__info">
            <h3 className="modal__title">Barter Blockchain</h3>
            <div className="modal__desc">{t('modal-5-2')}</div>
            <div className="modal__items">
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-9.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-5-3')}
                  </div>
                </div>
              </div>
              <div className="modal__item">
                <div className="modal__img">
                  <img src="images-new/modal-new-10.png" alt="" />
                </div>
                <div className="modal__information">
                  <span className="showcase__span third"></span>
                  <span className="showcase__span fourth"></span>
                  <div className="modal__content">
                    {t('modal-5-4')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
