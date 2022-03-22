export function getDifferenceInHours(date1: any, date2: any) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

export function getDifferenceInMinutes(date1: any, date2: any) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}

export function getDifferenceInSeconds(date1: any, date2: any) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / 1000;
}

export function showDiff(date1: any, date2: any) {
  let diff = (date2 - date1) / 1000;
  diff = Math.abs(Math.floor(diff));

  let days = Math.floor(diff / (24 * 60 * 60));
  let leftSec = diff - days * 24 * 60 * 60;

  let hrs = Math.floor(leftSec / (60 * 60));
  leftSec = leftSec - hrs * 60 * 60;

  let min = Math.floor(leftSec / 60);
  leftSec = leftSec - min * 60;

  return {
    d: days,
    h: hrs,
    i: min,
    s: leftSec,
  };
}
