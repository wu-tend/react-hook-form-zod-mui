import { z } from 'zod'

// zodのpreprocessを使って、値が空文字の場合はnullに変換する
const castToValOrNull = <T extends Parameters<typeof z.preprocess>[1]>(
  schema: T,
) =>
  z.preprocess((val) => {
    if (typeof val === 'string') {
      const trimmedVal = val.trim()
      return trimmedVal.length > 0 ? trimmedVal : null
    }
    return null
  }, schema)

// フォームのsubmit時に走るschema
export const qaFormSchema = z.object({
  // name: castToValOrNull(z.string()),
  answer: castToValOrNull(z.string()),
  selectedValue: castToValOrNull(
    z.string({"message": "問題を選択してください"})
  ),
  // multiOptions: z.array(z.string()).min(1),
})

export type QAFormSchema = z.infer<typeof qaFormSchema>