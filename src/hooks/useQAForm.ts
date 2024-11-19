import { useForm, useWatch } from 'react-hook-form'
import {
  QAFormSchema,
  qaFormSchema,
} from '../schema/submit-validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectOptions } from '../components/RHFSelect'

const useSampleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // useFormのジェネリクスにはdefaultValuesの型を渡す
  } = useForm<QAFormSchema>({
    mode: 'onTouched',
    // reValidateModeをonBlurにすることで、入力値が変更された時にresolverに指定されたvalidationが走る
    reValidateMode: 'onBlur',
    // デフォルト状態はフォーム要素全てをundefinedにする
    defaultValues: undefined,
    // zodResolverの引数にonSubmit時に走るschemaを渡す
    resolver: zodResolver(qaFormSchema),
  })

  const watchedInput = useWatch({ control })
  // フォームのエラー状況
  console.log('errors', errors)
  // フォームの入力値
  console.log('watchedInput', watchedInput)

  // zodの値変換+型チェックを通過した場合のみonSubmitが実行
  const onSubmit = (data: QAFormSchema) => {
    console.log('data', data) // 入力値
  }

  return {
    form: {
      control,
      handleSubmit,
      onSubmit,
    },
    options: {
      questions,
    },
  }
}

export default useSampleForm

const questions = [
  {
    value: 'Q1',
    label: 'Q1',
  },
  {
    value: 'Q2',
    label: 'Q2',
  },
  {
    value: 'Q3',
    label: 'Q3',
  },
] as const satisfies SelectOptions