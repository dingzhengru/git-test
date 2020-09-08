export function inputAmount(amount, min = 0, max = 0) {
  if (amount < min) {
    amount = min;
  } else if (amount > max) {
    amount = max;
  }

  if (!Number.isInteger(amount)) {
    amount = Math.floor(amount);
  }

  console.log(amount);
  return amount;
}

export function validateAmount(amount, min, max) {
  if (amount < min) {
    return false;
  } else if (amount > max) {
    return false;
  } else if (!Number.isInteger(amount)) {
    return false;
  }

  return true;
}
