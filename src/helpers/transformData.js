export const transformData = data => {
  let xVC = String(data);
  let sVC = xVC.split('');
  let indexVC = xVC.length - 1;
  let wVC = Math.floor(indexVC / 3);

  if (wVC >= 1) {
    for (let i = 1; i <= wVC; i += 1) {
      indexVC = indexVC - 1 - i;
      sVC.splice(indexVC, 0, ' ');
      let rVC = sVC.join('');
      data = rVC;
      return data;
    }
  } else {
    return data;
  }
};
