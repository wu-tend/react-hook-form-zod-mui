import useQAForm from '../hooks/useQAForm'
import { Box, Button, Typography } from '@mui/material'
import RHFTextField from './RHFMultiTextField'
import RHFSelect from './RHFSelect'
import { useWatch } from 'react-hook-form'

type QuestionTexts = {
  [key: string]: string;
};

const QAForm = () => {
  const {
    form: { control, handleSubmit, onSubmit },
    options: { questions },
  } = useQAForm()

  const selectedValue = useWatch({ control, name: 'selectedValue' })
  const questionTexts: QuestionTexts = require('../assets/questionTexts.json')

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      width={'1000px'}
      margin={'50px auto'}
      bgcolor="#EEEEEE"
      p={3}
      borderRadius={5}
    >
      <RHFSelect
        name="selectedValue"
        label="問題"
        control={control}
        options={questions}
      />
      {selectedValue && (
        <Typography variant="body1">{questionTexts[selectedValue]}</Typography>
      )}
      <RHFTextField 
        name="answer" 
        control={control} label="解答" 
      />
      <Button type="submit" variant="outlined" sx={{ mt: 2, width: 200 }}>
        送信
      </Button>
    </Box>
  )
}

export default QAForm