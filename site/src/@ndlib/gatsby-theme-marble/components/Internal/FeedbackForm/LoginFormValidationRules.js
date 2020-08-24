/* eslint-disable complexity */
export default function validate (values) {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email address is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid'
  }
  if (!values.feedback) {
    errors.feedback = 'Please input your feedback here'
  } else if (values.feedback.length === 0) {
    errors.feedback = 'Question or comment is required'
  }
  if (!values.category) {
    errors.category = 'Please check a category type'
  } else if (values.category.trim() === '') {
    errors.category = 'Category is required'
  }
  return errors
};
