const { Decimal } = require("decimal.js");
const { Op } = require("sequelize");
const { Stake } = require("../models");

const DAY_MILLISECONDS = 60 * 60 * 24 * 1000;

const getTotalStaked = async () => {
  const totalStaked = await Stake.sum("balance");

  return (totalStaked)
    ? new Decimal(totalStaked)
    : new Decimal(0);
};

class StakesController {
  async getStakes(req, res) {
    const today = new Date();
  
    const { count, rows } = await Stake.findAndCountAll({
      attributes: ["balance", "depositAmount", "withdrawalAmount", "address", "activeSince"],
      where: {
        balance: {
          [Op.gt]: 0,
        },
      },
      offset: req.query.offset,
      limit: req.query.limit,
      order: [
        ["balance", "DESC"],
      ],
    });
  
    const totalStaked = await getTotalStaked();
    const now = Date.now();
  
    const stakes = rows.map((stake, index) => {
      // If activeSince is null, replace it with today's date
      const activeSince = stake.activeSince || today;
      const elapsed = now - new Date(activeSince).valueOf();
  
      const days = Math.floor(elapsed / DAY_MILLISECONDS);
      const rating = req.query.offset + index;
  
      const share = stake.balance
        .div(totalStaked)
        .mul(new Decimal(100));
  
      const reward = stake.balance
        .sub(stake.depositAmount)
        .add(stake.withdrawalAmount);
  
      return {
        rating,
        address: stake.address,
        days,
        share: (share.isNaN()) ? "0.00" : share.toFixed(2),
        balance: stake.balance,
        reward,
      };
    });
  
    res.status(200).json({ stakes, total: count });
  }
  

  async getStake(req, res) {
    const stake = await Stake.findOne({
      attributes: ["balance", "depositAmount", "withdrawalAmount", "address", "activeSince"],
      where: {
        address: req.params.address,
      },
    });

    if (stake) {
      const elapsed = (stake.activeSince)
        ? Date.now() - stake.activeSince.valueOf()
        : 0;
      const days = Math.floor(elapsed / DAY_MILLISECONDS);

      const rating = await Stake.count({
        where: {
          balance: {
            [Op.gt]: stake.balance,
          },
        },
      });

      const totalStaked = await getTotalStaked();
      const share = stake.balance
        .div(totalStaked)
        .mul(new Decimal(100));

      const reward = stake.balance
        .sub(stake.depositAmount)
        .add(stake.withdrawalAmount);

      res.status(200).json({
        stake: {
          rating,
          address: stake.address,
          days,
          share: (share.isNaN()) ? "0.00" : share.toFixed(2),
          balance: stake.balance,
          reward,
        },
      });
    } else {
      res.status(404).json({ error: "stake not found" });
    }
  }

  async predictRating(req, res) {
    const balanceAfter = req.query.balanceNow.add(req.query.amount);
    const ratingAfter = await Stake.count({
      where: {
        balance: {
          [Op.gt]: balanceAfter,
        },
      },
    });

    res.status(200).json({
      address: req.query.address,
      amount: req.query.amount,
      balanceAfter,
      ratingAfter,
    });
  }
};

module.exports = StakesController;
