export default function corecteDuration(duration: number): string {
    const hours: number = Math.floor(duration / 60)
    const minutes: number = Math.round(((duration /  60) - hours) * 60)
    return hours + 'ч' + ' ' + minutes + 'м'
  }