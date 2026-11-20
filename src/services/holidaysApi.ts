export type Holiday = { date: string; name: string; type: string }

function isHoliday(value: unknown): value is Holiday {
  return typeof value === 'object' && value !== null
    && 'date' in value && typeof value.date === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value.date)
    && 'name' in value && typeof value.name === 'string'
    && 'type' in value && typeof value.type === 'string'
}

export async function getHolidays(year: number, signal: AbortSignal): Promise<Holiday[]> {
  const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${year}`, { signal })
  if (!response.ok) throw new Error('Falha ao consultar feriados.')
  const data: unknown = await response.json()
  if (!Array.isArray(data) || !data.every(isHoliday)) {
    throw new Error('Resposta de feriados inválida.')
  }
  return data
}