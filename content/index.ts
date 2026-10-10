import type { Locale } from "@/lib/i18n"
import { ar } from "./ar"
import { en, type Dict } from "./en"

const dictionaries: Record<Locale, Dict> = { en, ar }

export const getDict = (locale: Locale): Dict => dictionaries[locale]
export type { Dict }
