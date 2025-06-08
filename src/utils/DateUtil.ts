/**
 * 日期时间工具类
 */
export class DateUtil {
  /**
   * 格式化日期
   * @param date 可解析的日期值
   * @param format 格式字符串（默认：YYYY-MM-DD HH:mm:ss）
   * @example format(new Date(), 'YYYY/MM/DD') // 返回 "2023/07/20"
   */
  static format(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
    const d = new Date(date)
    if (isNaN(d.getTime())) throw new Error('Invalid Date')

    const pad = (n: number) => n.toString().padStart(2, '0')

    return format
      .replace(/YYYY/g, d.getFullYear().toString())
      .replace(/MM/g, pad(d.getMonth() + 1))
      .replace(/DD/g, pad(d.getDate()))
      .replace(/HH/g, pad(d.getHours()))
      .replace(/mm/g, pad(d.getMinutes()))
      .replace(/ss/g, pad(d.getSeconds()))
  }

  /**
   * 解析日期字符串/时间戳为Date对象
   * @param input 可解析的日期值
   */
  static parse(input: string | number): Date {
    if (typeof input === 'number') return new Date(input)
    if (!isNaN(Number(input))) return new Date(Number(input))
    return new Date(input)
  }

  /**
   * 计算日期差值
   * @param start 开始日期
   * @param end 结束日期
   * @param unit 时间单位（默认毫秒）
   */
  static diff(start: Date, end: Date, unit: 'ms' | 's' | 'm' | 'h' | 'd' = 'ms'): number {
    const diff = end.getTime() - start.getTime()
    const units = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 }
    return diff / units[unit]
  }

  /**
   * 添加时间单位
   * @param date 基准日期
   * @param value 要添加的数值
   * @param unit 时间单位
   * @example add(new Date(), 3, 'd') // 返回3天后的日期
   */
  static add(date: Date, value: number, unit: 'y' | 'M' | 'd' | 'h' | 'm' | 's' | 'ms'): Date {
    const d = new Date(date)
    const methods = {
      y: 'FullYear',
      M: 'Month',
      d: 'Date',
      h: 'Hours',
      m: 'Minutes',
      s: 'Seconds',
      ms: 'Milliseconds'
    } as const

    d[`set${methods[unit]}`](d[`get${methods[unit]}`]() + value)
    return d
  }

  /**
   * 人性化时间显示（例如：3分钟前）
   * @param date 目标日期
   */
  static fromNow(date: Date): string {
    const now = new Date()
    const diff = this.diff(date, now, 's')

    const units = [
      { limit: 60, text: '刚刚' },
      { limit: 3600, value: 60, unit: '分钟' },
      { limit: 86400, value: 3600, unit: '小时' },
      { limit: 604800, value: 86400, unit: '天' },
      { limit: 2592000, value: 604800, unit: '周' },
      { limit: 31536000, value: 2592000, unit: '个月' },
      { value: 31536000, unit: '年' }
    ]

    for (const u of units) {
      if (diff < u.limit!) {
        return u.unit
          ? `${Math.floor(diff / u.value)}${u.unit}前`
          : u.text!
      }
    }
    return this.format(date)
  }

  /**
   * 判断是否为同一天
   * @param date1 日期1
   * @param date2 日期2
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString()
  }

  /**
   * 获取当月第一天
   * @param date 基准日期
   */
  static startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  /**
   * 获取当月最后一天
   * @param date 基准日期
   */
  static endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  /**
   * 获取季度信息
   * @param date 基准日期
   * @returns [季度开始日期, 季度结束日期, 季度数]
   */
  static getQuarter(date: Date): [Date, Date, number] {
    const quarter = Math.floor(date.getMonth() / 3)
    const start = new Date(date.getFullYear(), quarter * 3, 1)
    const end = new Date(start.getFullYear(), start.getMonth() + 3, 0)
    return [start, end, quarter + 1]
  }
}

// // 格式化日期
// DateUtil.format(new Date(), 'YYYY年MM月DD日 HH时mm分')
// // 计算时间差
// const start = new Date('2023-01-01')
// const end = new Date('2023-07-20')
// DateUtil.diff(start, end, 'd') // 返回天数差
// // 添加时间
// DateUtil.add(new Date(), 3, 'h') // 3小时后
// // 人性化时间
// DateUtil.fromNow(new Date(Date.now() - 3600 * 1000)) // "1小时前"
