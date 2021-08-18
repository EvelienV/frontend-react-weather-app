function createTimeString(time) {
  const day = new Date(time * 1000);
  return day.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})
}

export default createTimeString;