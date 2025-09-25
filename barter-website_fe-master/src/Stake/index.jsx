import BeatLoader from "react-spinners/BeatLoader";
import DocumentMeta from "react-document-meta";
import { barterAbi, stakingBarterAbi } from "./abi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount, useDisconnect } from "@web3modal/ethers/react";

const defaultTokenInfo = () => {
  return {
    tokenPrice: "0.0071",
    totalValueLocked: "4729545",
    stakingPool: "32466548",
    distributedAmount: "33452",
    distributedAmountPrice: "224.1284",
    monthlyRate: "2.0000",
    tokenAddress: "0x6E7F6A2404Ff6b4363b0A5085DBf7B78d46E04d7",
    stakingTokenAddress: "0x66b66aE84D3d9b95065991EEDbD1a6b8DfBFD9ae",
  };
};

export default function Stake() {
  const { t } = useTranslation("stake");
  const { address, isConnected } = useWeb3ModalAccount();
  const [tokenInfo, setTokenInfo] = useState(defaultTokenInfo());

  useEffect(() => {
    fetch("https://barter.company/api/tokenInfo")
      .then(response => response.json())
      .then(data => setTokenInfo(data.tokenInfo))
  }, [address]);

  return (
    <DocumentMeta title={t("title")}>
      <StakeMain address={address} isConnected={isConnected} tokenInfo={tokenInfo} />
      <TokenInfo tokenInfo={tokenInfo} />
      <StakeWork />
      <Stakers address={address} />
    </DocumentMeta>
  );
}

function StakeMain({ address, isConnected, tokenInfo }) {
  return (
    <div className="wrapper-showcase about-wrapper wrapper-stake">
      <div className="stake">
        <div className="container">
          <div className="stake__inner">
            <StakingInfo tokenInfo={tokenInfo} />
            <StakeForm address={address} isConnected={isConnected} tokenInfo={tokenInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StakingInfo({ tokenInfo }) {
  const { t } = useTranslation("stake");

  return (
    <>
      <div className="stake__img first">
        <img src="images-new/stake-first.png" alt="" />
      </div>
      <div className="stake__img second">
        <img src="images-new/stake-second.png" alt="" />
      </div>
      <div className="stake__img third">
        <img src="images-new/stake-third.png" alt="" />
      </div>
      <div className="stake__content">
        <h3 className="stake__title title">{t("top-1")}</h3>
        <div className="stake__text">
          <p>{t("top-2")}</p>
          <span>{`${t("top-3")} ${tokenInfo.distributedAmount} BRTR ($${tokenInfo.distributedAmountPrice})`}</span>
        </div>
        <a
          href="https://app.uniswap.org/explore/tokens/polygon/0x6e7f6a2404ff6b4363b0a5085dbf7b78d46e04d7"
          target="_blank"
          className="modal__btn"
        >
          <span>{t("top-4")}</span>
          <img src="images-new/modal-arrow.svg" alt="" />
        </a>
      </div>
    </>
  );
}

function StakeForm({ address, isConnected, tokenInfo }) {
  const { t } = useTranslation("stake");
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div className="stake-form">
      <div className="showcase__span first"></div>
      <div className="showcase__span second"></div>
      <div className="showcase__span third"></div>
      <div className="showcase__span fourth"></div>
      <div className="stake-form__title">{t("top-5")}</div>
      {isWaiting
        ? <StakeFormWaiting isWaiting={isWaiting} />
        : <StakeFormNormal
            address={address}
            isConnected={isConnected}
            setIsWaiting={setIsWaiting}
            tokenInfo={tokenInfo}
          />
      }
    </div>
  );
}

function StakeFormWaiting({ isWaiting }) {
  return (
    <div style={{display: "flex", justifyContent: "center", paddingTop: "150px"}}>
      <BeatLoader
        color={"#3660cd"}
        loading={isWaiting}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

function StakeFormNormal({ address, isConnected, setIsWaiting, tokenInfo }) {
  const { t } = useTranslation("stake");
  const [tab, setTab] = useState("add");
  const [myStake, setMyStake] = useState(null);

  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();  

  const [amount, setAmount] = useState(0);
  const [ratingAfter, setRatingAfter] = useState(-1);
  const [balanceAfter, setBalanceAfter] = useState("0");
  const [balanceOf, setBalanceOf] = useState(0n);
  const [stakeBalanceOf, setStakeBalanceOf] = useState(0n);

  const isMobile = window.matchMedia("only screen and (max-width: 830px)").matches;

  useEffect(() => {
    if (!address)
      return;

    fetch(`https://barter.company/api/stakes/${address}`)
      .then(response => response.json())
      .then(data => setMyStake(data.stake))
  }, [address]);

  useEffect(() => {
    let amountToSend = 0;

    if (amount) {
      if(tab === "add")
        amountToSend = amount;
      else if (tab === "remove")
        amountToSend = -amount;
    }

    fetch(`https://barter.company/api/stakes/predictRating?balanceNow=${myStake?.balance ?? 0}&amount=${amountToSend}`)
      .then(response => response.json())
      .then(data => {
        setRatingAfter(data.ratingAfter)
        setBalanceAfter(data.balanceAfter)
      })
  }, [myStake, amount, tab]);

  useEffect(() => {
    getBalance();
  }, [address, isConnected, tokenInfo]);

  async function getBalance() {
    if (!isConnected) {
      console.warn("User is not connected");
      return;
    }

    const ethersProvider = new ethers.BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    const barterContract = new ethers.Contract(tokenInfo.tokenAddress, barterAbi, signer);
    const stakingContract = new ethers.Contract(tokenInfo.stakingTokenAddress, stakingBarterAbi, signer);

    const [barterBalance, stakeBarterBalance] = await Promise.all([
      barterContract.balanceOf(address),
      stakingContract.balanceOf(address),
    ]);

    setBalanceOf(ethers.formatUnits(barterBalance, 8));
    setStakeBalanceOf(ethers.formatUnits(stakeBarterBalance, 8));
  }

  async function add() {
    const ethersProvider = new ethers.BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    const barterContract = new ethers.Contract(tokenInfo.tokenAddress, barterAbi, signer);
    const stakingContract = new ethers.Contract(tokenInfo.stakingTokenAddress, stakingBarterAbi, signer);

    const allowance = await barterContract.allowance(address, tokenInfo.stakingTokenAddress);
    const parsedAmount = parseAmount(amount);

    console.log(ethers.MaxUint256)

    setIsWaiting(true);

    try {
      // if (allowance <= parseAmount)  {
        // const { maxFeePerGas, maxPriorityFeePerGas } = await ethersProvider.getFeeData()
        // const gasLimit = await barterContract.approve.estimateGas(tokenInfo.stakingTokenAddress, ethers.MaxUint256)
        // const transactionParams = { maxFeePerGas, maxPriorityFeePerGas, gasLimit }

        const approveTransaction = await barterContract.approve(tokenInfo.stakingTokenAddress, ethers.MaxUint256, {gasLimit: 6000000});
        await approveTransaction.wait();
      // }

      // const { maxFeePerGas, maxPriorityFeePerGas } = await ethersProvider.getFeeData()
      // const gasLimit = await stakingContract.mint.estimateGas(parseAmount)
      // const transactionParams = { maxFeePerGas, maxPriorityFeePerGas, gasLimit }

      const mintTransaction = await stakingContract.mint(parsedAmount, {gasLimit: 6000000});
      await mintTransaction.wait();

      window.location.reload();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsWaiting(false);
    }
  }

  async function remove() {
    const ethersProvider = new ethers.BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    const stakingContract = new ethers.Contract(tokenInfo.stakingTokenAddress, stakingBarterAbi, signer);
    const parsedAmount = parseAmount(amount);

    if (parsedAmount > stakeBalanceOf)
      return;

    setIsWaiting(true)

    try {
      const burnTransaction = await stakingContract.burn(parsedAmount);
      await burnTransaction.wait();

      window.location.reload();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsWaiting(false);
    }
  }

  const isValidAmount = () => {
    if (Number(amount) <= 0)
      return false;

    if (tab === "add")
      return Number(amount) <= Number(balanceOf);

    if (tab === "remove")
      return Number(amount) <= Number(stakeBalanceOf);

    return false;
  };

  return (
    <>
      <FormTabs tab={tab} setTab={setTab} />
      <form action="#">
        <div className="stake-form__items">
          {isConnected &&
            <div style={{display: "flex", justifyContent: "center", color: "#8f94ae", margin: 5, fontSize: "13px"}}>
              <div>{t("form-0")}: {toShortAddress(address)}</div>
            </div>
          }

          {(tab === "add" || tab === "remove" )
            ?
            <div className="stake-add">
              <div className="stake-add__top">
                <div className="stake-add__grid">
                  <p>{t("form-1")}</p>
                  <span>{myStake ? Number(myStake.balance).toFixed(2) : 0}</span>
                </div>
                <div className="stake-add__grid">
                  <p>{t("form-2")}</p>
                  <span>{myStake ? myStake.rating + 1 : 0}</span>
                </div>
              </div>
              <div className="stake-add__info">
                <div className="stake-add__head">
                  <p>{tab === "add" ? t("form-3") : t("form-3-1")}</p>
                  <div><span>{t("form-4")}: </span>
                  <span style={{whiteSpace: 'nowrap'}}> {tab === "add"
                    ? Number(balanceOf).toFixed(2)
                    : Number(stakeBalanceOf).toFixed(2)} BRTR</span>
                  </div>
                </div>
                <label className="field">
                  <input
                    value={(amount === 0) ? "" : amount}
                    placeholder={t("form-13") + " BRTR"}
                    name="Enter the amount of BRTR"
                    onChange={e => setAmount(e.target.value.replace(/^[\D0]+|\D/g, ""))}
                    maxLength="8"
                  />
                </label>
                <div className="stake-add__items">
                  <div className="stake-add__item">
                    <p>{tab === "add" ? t("form-5") : t("form-5-1")}</p>
                    <span>{(Number(balanceAfter) >= 0) ? parseFloat(balanceAfter).toFixed(2) : 0} BRTR</span>
                  </div>

                  <div className="stake-add__item">
                    <p>{t("form-6")}</p>
                    <span>{(Number(balanceAfter) >= 0) ? (parseFloat(tokenInfo.monthlyRate) * 0.01 * parseFloat(balanceAfter)).toFixed(2) : 0} BRTR</span>
                  </div>
                  <div className="stake-add__item">
                    <p>{t("form-7")}</p>
                    <span>{ratingAfter + 1}</span>
                  </div>
                </div>
              </div>
              <div style={(isMobile) 
                ? {display: 'table', margin: '0 auto'} 
                : {display: 'flex', flexDirection: 'row', justifyContent: 'center'}
              }>
                <div><a
                  className="stake-add__btn modal__btn"
                  style={
                    (!isConnected || isValidAmount())
                      ? {opacity: 1, width: 280}
                      : {opacity: 0.2}
                  }
                  onClick={() => {
                    isConnected
                      ? (
                        tab === "add"
                          ? (Number(amount) > 0 && Number(amount) <= Number(balanceOf) && add())
                          : (Number(amount) > 0 && Number(amount) <= Number(stakeBalanceOf) && remove())
                      )
                      : open()
                  }}
                >
                  <span>{
                    isConnected
                      ? (tab === "remove"
                        ? t("top-7")
                        : t("form-14")
                      ) : t("form-15")
                  }</span>
                  <img src="images-new/modal-arrow.svg" alt="" />
                </a></div>
                {isConnected && <div><a
                  className="stake-add__btn modal__btn"
                  style={isMobile ? {opacity: 1, width: 250, marginTop: 10} : {opacity: 1, width: 240, marginLeft: 10}}
                  onClick={() => {
                    isConnected && disconnect()
                  }}
                >
                  <span>{
                    isConnected
                      ? t("top-9")
                      : t("form-15")
                  }</span>
                  <img src="images-new/modal-arrow.svg" alt="" />
                </a></div>}
              </div>
            </div>
            :
            <Stats isConnected={isConnected} myStake={myStake} open={open} setTab={setTab} />
          }
        </div>
      </form>
    </>
  );
}

function Stats({ isConnected, myStake, open, setTab }) {
  const { t } = useTranslation("stake");

  return (
    <div className="stake-stat">
      <div className="stake-stat__inner">
        <div className="stake-stat__items">
          <StatsItem name={t("form-1")} value={myStake ? `${myStake.balance} BRTR` : "-"} />
          <StatsItem name={t("form-2")} value={myStake ? myStake.rating + 1 : "-"} />
          <StatsItem name={t("form-8")} value={myStake ? `${myStake.share}%` : "-"} />
          <StatsItem name={t("form-9")} value={myStake ? `${myStake.reward} BRTR` : "-"} />
          <StatsItem name={t("form-10")} value={myStake ? `${myStake.days} ${t("form-11")}` : "-"} />
        </div>

        <div className="stake-stat__info">
          <ul className="listing__list">
            <li>
              <img src="images-new/showcase-icon.svg" alt="" />
              <span>{t("form-12")}</span>
            </li>
          </ul>
        </div>
        <div className="stake__btns">
          {isConnected ?
            <>
              <a
                className="stake-add__btn modal__btn"
                onClick={() => setTab("add")}
              >
                <span>{t("top-6")}</span>
                <img src="images-new/modal-arrow.svg" alt="" />
              </a>
              <a
                className="stake-add__btn modal__btn"
                onClick={() => setTab("remove")}
              >
                <span>{t("top-7")}</span>
                <img src="images-new/modal-arrow.svg" alt="" />
              </a>
            </>
            :
            <a className="stake-add__btn modal__btn" onClick={() => open()}>
              <span>{t("form-15")}</span>
              <img src="images-new/modal-arrow.svg" alt="" />
            </a>
          }
        </div>
      </div>
    </div>
  );
}

function StatsItem({ name, value }) {
  return (
    <div className="stake-stat__item">
      <p>{name}</p>
      <span>{value}</span>
    </div>
  );
}

function FormTabs({ tab, setTab }) {
  const { t } = useTranslation("stake");

  return (
    <div className="stake-form__tabs">
      <FormTab tabName="add" tabTitle={t("top-6")} tab={tab} setTab={setTab} />
      <FormTab tabName="remove" tabTitle={t("top-7")} tab={tab} setTab={setTab} />
      <FormTab tabName="stat" tabTitle={t("top-8")} tab={tab} setTab={setTab} />
    </div>
  );
}

function FormTab({ tabName, tabTitle, tab, setTab }) {
  return (
    <div
      className={`stake-form__tab ${tab === tabName && "active"}`}
      onClick={() => setTab(tabName)}
    >{tabTitle}</div>
  );
}

function TokenInfo({ tokenInfo }) {
  const { t } = useTranslation("stake");

  return (
    <div className="stake-value">
      <div className="container">
        <div className="stake-value__inner">
          <h3 className="stake-value__title">{t("value-1")}</h3>

          <div className="stake-value__items">
            <TokenInfoItem name={t("value-2")} value={`$${tokenInfo.tokenPrice}`} />
            <TokenInfoItem name={t("value-3")} value={`${tokenInfo.totalValueLocked} BRTR`} />
            <TokenInfoItem name={t("value-4")} value={`${tokenInfo.stakingPool} BRTR`} />
            <TokenInfoItem name={t("value-5")} value={`${tokenInfo.monthlyRate}%`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenInfoItem({ name, value }) {
  return (
    <div className="stake-value__item">
      <div className="showcase__span third"></div>
      <div className="showcase__span fourth"></div>
      <div className="stake-value__name">{name}:</div>
      <div className="stake-value__price">{value}</div>
    </div>
  );
}

function StakeWork() {
  const { t } = useTranslation("stake");

  return (
    <div className="stake-work">
      <div className="container">
        <div className="stake-work__inner">
          <h3 className="stake-work__title">{t("work-1")}</h3>
          <div className="stake-work__listing">
            <ul className="listing__list">
              <li>
                <img src="images-new/showcase-icon.svg" alt="" />
                <span>{t("work-2")}<br />{t("work-3")}</span>
              </li>
            </ul>
          </div>
          <div className="stake-work__items">
            <StakeWorkItem imgSrc="images-new/stake-w-1.png" text={t("work-4")} />
            <StakeWorkItem imgSrc="images-new/stake-w-2.png" text={t("work-5")} />
            <StakeWorkItem imgSrc="images-new/stake-w-3.png" text={t("work-6")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StakeWorkItem({ imgSrc, text }) {
  return (
    <div className="stake-work__item">
      <div className="showcase__span first"></div>
      <div className="showcase__span second"></div>
      <div className="showcase__span third"></div>
      <div className="showcase__span fourth"></div>

      <div className="stake-work__img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="stake-work__name">{text}</div>
    </div>
  )
}

function Stakers({ address }) {
  const { t } = useTranslation("stake");
  const [stakes, setStakes] = useState([]);
  const [pagin, setPagin] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("https://barter.company/api/stakes?offset=" + (pagin-1) * 20)
      .then(response => response.json())
      .then(data => {
        setTotal(data.total)
        setStakes(data.stakes)
      })
  }, [address, pagin]);

  const isMobile = window.matchMedia("only screen and (max-width: 830px)").matches;

  const stakers = stakes.map((stake, i) => {
    const isOdd = (i & 1) === 1;

    return (
      <div key={i} className={`stakers__item ${isOdd ? "blue" : ""}`}>
        <div className="stakers__number">{i + 1 + (pagin-1) * 20}</div>
        <div className="stakers__address">
          <span>{t("stakers-3")}</span>
          <p>{isMobile ? toShortAddress(stake.address) : stake.address}</p>
        </div>
        <div className="stakers__days">
          <span>{t("stakers-4")}</span>
          <p>{stake.days}</p>
        </div>
        <div className="stakers__share">
          <span>{t("stakers-5")}</span>
          <p>{stake.share}%</p>
        </div>
        <div className="stakers__stake">
          <span>{t("stakers-6")}</span>
          <p>{isMobile ? toShortValue(stake.balance) : stake.balance}</p>
        </div>
        <div className="stakers__reward">
          <span>{t("stakers-7")}</span>
          <p>{isMobile ? toShortValue(stake.reward) : stake.reward}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="stakers">
      <div className="container">
        <div className="stakers__inner">
          <h3 className="stakers__title">{t("stakers-1")}</h3>
          <div className="stakers__top">
            <span>{t("stakers-2")}</span>
            <span>{t("stakers-3")}</span>
            <span>{t("stakers-4")}</span>
            <span>{t("stakers-5")}</span>
            <span>{t("stakers-6")}</span>
            <span>{t("stakers-7")}</span>
          </div>
          <div className="stakers__items">{stakers}</div>
        </div>
      </div>
            <ul className="pagination">
              <li className="pagination__prev">
                <a style={{cursor: 'pointer', paddingTop: 1}} onClick={()=> { pagin > 1 && setPagin(pagin - 1) }}>
                  <svg>
                    <use xlinkHref="/images-new/icons-sprite.svg#pag-arrow"></use>
                  </svg>
                </a>
              </li>

              {[...Array(~~(total/20) + 1)]
                .map((_, index) => 
                <li key={index} className={'pagination__number' + (pagin === index+1 ? ' active' : '')}>
                  <a style={{cursor: 'pointer'}} onClick={()=>setPagin(index + 1)}>{index + 1}</a>
                </li>)
              }

              <li className="pagination__next">
                <a style={{cursor: 'pointer'}} onClick={()=> {(pagin < (~~(total/20)+1)) && setPagin(pagin + 1)}}>
                  <svg style={{paddingLeft: 1 }}>
                    <use xlinkHref="/images-new/icons-sprite.svg#pag-arrow"></use>
                  </svg>
                </a>
              </li>
            </ul>
    </div>
  );
}

function toShortAddress(address) {
  return  `${address.slice(0, 8)}...${address.slice(-8)}`;
}

function toShortValue(value) {
  return Number(value).toFixed(2);
}

function parseAmount(amount) {
  return BigInt(Number(amount).toFixed(8).replace(".", ""));
}
