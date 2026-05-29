// 📁 src/utils/format.js

// Format number like: 50000 → "50,000"
export const formatNumber = (num) => {
  if (!num) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format salary like: 50000 → "₹50,000"
export const formatSalary = (amount) => {
  if (!amount) return "Not Provided";
  return "₹" + formatNumber(amount);
};

// Convert a date string to "x days ago"
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

// Truncate long job descriptions like: "Lorem ipsum..." → "Lorem ipsu..."
export const truncateText = (text, length = 120) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
