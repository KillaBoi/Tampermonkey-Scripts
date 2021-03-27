var config = {
  baseBet: { label: "Base bet", type: "balance", value: 100 },             // how many satoshis to bet initially
  target: { label: "Target", type: "multiplier", value: 1.4 },               // target multiplier
  betMultiplier: { label: "Bet multiplier", type: "multiplier", value: 4.098 } // what to multiply the bet size by when we lose a wager
}


let lossCount = 0
this.log(`Starting martingale with a base bet of ${config.baseBet.value/100} bits.`)

while (true) {
  // make the bet and wait for the result
  const { multiplier } = await this.bet(betSize(lossCount), config.target.value)

  if (multiplier < config.target.value) { // loss
    lossCount++
    this.log(`Lost bet. Multiplying bet size by ${config.betMultiplier.value} for new bet size of ${betSize(lossCount)/100} bits.`)
  } else { // win
    lossCount = 0
    this.log(`Won bet. Setting bet size to ${config.baseBet.value/100} bits.`)
  }
await new Promise(r => setTimeout(r, 1000));
}

function betSize(lossCount) {
  const bet = config.baseBet.value * Math.pow(config.betMultiplier.value, lossCount)
  return Math.round(bet / 100) * 100
}
