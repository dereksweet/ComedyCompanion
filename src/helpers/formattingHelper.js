export function formatDisplayTime(total_seconds) {
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor((total_seconds - (hours * 3600)) / 60);
  const seconds = Math.floor(total_seconds - (hours * 3600) - (minutes * 60));

  return `${hours > 0 ? hours.toString() + ':' : ''}${minutes > 9 ? minutes.toString() : '0' + minutes.toString()}:${seconds > 9 ? seconds.toString() : '0' + seconds.toString()}`;
}

export function formatBytesInGigabytes(bytes) {
  return `${(bytes / 1000000000).toFixed(2)} Gb`
}

export function formatBytesInMegabytes(bytes) {
  return `${(bytes / 1000000).toFixed(2)} Mb`
}