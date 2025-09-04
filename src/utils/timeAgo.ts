function timeAgo(date: string) {
  const now: Date = new Date();
  const past: Date = new Date(date);
  const seconds: number = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000, // 365 * 24 * 60 * 60
    month: 2592000, // 30 * 24 * 60 * 60
    week: 604800, // 7 * 24 * 60 * 60
    day: 86400, // 24 * 60 * 60
    hour: 3600, // 60 * 60
    minute: 60,
    second: 1,
  };

  for (const key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return value === 1 ? `1 ${key} ago` : `${value} ${key}s ago`;
    }
  }

  return "just now";
}

export default timeAgo;
