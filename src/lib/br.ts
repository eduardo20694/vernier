/** Brazilian document helpers — CPF/CNPJ check digits and formatting. */

export function stripDigits(value: string): string {
  return value.replace(/\D/g, '')
}

function allSameDigit(digits: string): boolean {
  return /^(\d)\1+$/.test(digits)
}

export function isValidCpf(digits: string): boolean {
  const cpf = stripDigits(digits)
  if (cpf.length !== 11) return false
  if (allSameDigit(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i)
  let remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== Number(cpf[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10) remainder = 0
  if (remainder !== Number(cpf[10])) return false

  return true
}

const CNPJ_WEIGHTS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const
const CNPJ_WEIGHTS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] as const

export function isValidCnpj(digits: string): boolean {
  const cnpj = stripDigits(digits)
  if (cnpj.length !== 14) return false
  if (allSameDigit(cnpj)) return false

  let sum = 0
  for (let i = 0; i < 12; i++) sum += Number(cnpj[i]) * CNPJ_WEIGHTS_1[i]
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder
  if (digit1 !== Number(cnpj[12])) return false

  sum = 0
  for (let i = 0; i < 13; i++) sum += Number(cnpj[i]) * CNPJ_WEIGHTS_2[i]
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder
  if (digit2 !== Number(cnpj[13])) return false

  return true
}

export function formatCpf(raw: string): string {
  const d = stripDigits(raw).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export function formatCnpj(raw: string): string {
  const d = stripDigits(raw).slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

export type DocumentKind = 'cpf' | 'cnpj'

export function resolveDocumentKind(
  digits: string,
  mode: DocumentKind | 'auto'
): DocumentKind {
  if (mode !== 'auto') return mode
  return stripDigits(digits).length > 11 ? 'cnpj' : 'cpf'
}

export function formatDocument(raw: string, mode: DocumentKind | 'auto'): string {
  const kind = resolveDocumentKind(raw, mode)
  return kind === 'cpf' ? formatCpf(raw) : formatCnpj(raw)
}

export function isValidDocument(digits: string, mode: DocumentKind | 'auto'): boolean {
  const kind = resolveDocumentKind(digits, mode)
  return kind === 'cpf' ? isValidCpf(digits) : isValidCnpj(digits)
}

export function documentComplete(digits: string, mode: DocumentKind | 'auto'): boolean {
  const d = stripDigits(digits)
  const kind = resolveDocumentKind(digits, mode)
  return kind === 'cpf' ? d.length === 11 : d.length === 14
}
