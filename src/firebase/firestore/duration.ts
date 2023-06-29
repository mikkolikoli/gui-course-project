export class Duration {
  hours: number
  minutes: number
  seconds: number

  constructor (hours?: number, minutes?: number, seconds?: number) {
    this.hours = hours || 0
    this.minutes = minutes || 0
    this.seconds = seconds || 0

    if (this.minutes >= 60) {
      this.hours += Math.floor(this.minutes / 60)
      this.minutes = this.minutes % 60
    }
    if (this.seconds >= 60) {
      this.minutes += Math.floor(this.seconds / 60)
      this.seconds = this.seconds % 60
    }
  }

  getTotalSeconds (): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds
  }
}