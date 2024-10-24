function timePassed(timestamp) {
  const currTime = new Date().getTime();
  console.log(currTime);
  console.log(timestamp);
  const timeStampPassed = currTime - timestamp;
  if (timeStampPassed >= 60000 && timeStampPassed < 60000 * 60) {
    return `${Math.floor(timeStampPassed / 60000)}m`;
  } else if (
    timeStampPassed >= 60000 * 60 &&
    timeStampPassed < 60000 * 60 * 24
  ) {
    return `${Math.floor(timeStampPassed / (60000 * 60))}h`;
  } else if (
    timeStampPassed >= 60000 * 60 * 24 &&
    timeStampPassed < 60000 * 60 * 24 * 30
  ) {
    return `${Math.floor(timeStampPassed / (60000 * 60 * 24))}d`;
  } else if (
    timeStampPassed >= 60000 * 60 * 24 * 30 &&
    timeStampPassed < 60000 * 60 * 24 * 30 * 12
  ) {
    return `${Math.floor(timeStampPassed / (60000 * 60 * 24))}M`;
  } else if (timeStampPassed >= 60000 * 60 * 24 * 30 * 12) {
    return `${Math.floor(timeStampPassed / (60000 * 60 * 24 * 12))}y`;
  } else {
    return `${Math.floor(timeStampPassed / 1000)}s`;
  }
}

module.exports = timePassed;
