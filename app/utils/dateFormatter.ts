export const dateFormatter = (dateString: string) => {
  const currentDate = new Date().getTime();
  const previousDate = new Date(dateString).getTime();
  const timeDifference = currentDate - previousDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(months / 12);

  if (years >= 2) {
    return `${years} years ago`;
  } else if (years === 1) {
    return `1 year ago`;
  } else if (months >= 2) {
    return `${months} months ago`;
  } else if (months === 1) {
    return `1 month ago`;
  } else if (days >= 14) {
    return `${Math.floor(days / 7)} weeks ago`;
  } else if (days >= 7) {
    return `1 week ago`;
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours === 1) {
    return `1 hour ago`;
  } else if (hours >= 2) {
    return `${hours} hours ago`;
  } else if (minutes >= 2) {
    return `${minutes} minutes ago`;
  } else {
    return `just now`;
  }
};
