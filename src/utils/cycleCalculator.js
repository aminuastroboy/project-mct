import { addDays, differenceInDays, formatISO, parseISO, isValid } from 'date-fns'

export function toISO(d){ return formatISO(d, {representation:'date'}) }

export function parseISOorNull(s){
  try{
    const d = parseISO(s)
    return isValid(d) ? d : null
  }catch(e){ return null }
}

// lastPeriod: Date object
export function nextPeriodStart(lastPeriod, cycleLength){
  return addDays(lastPeriod, cycleLength)
}

export function ovulationDay(lastPeriod, cycleLength){
  return addDays(lastPeriod, cycleLength - 14)
}

export function fertileWindow(lastPeriod, cycleLength){
  const start = addDays(lastPeriod, cycleLength - 19)
  const end = addDays(lastPeriod, cycleLength - 10)
  return { start, end }
}

export function daysUntil(targetDate){
  const today = new Date()
  return differenceInDays(targetDate, today)
}
