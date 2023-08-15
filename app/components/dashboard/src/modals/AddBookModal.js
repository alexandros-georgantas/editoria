/* eslint-disable react/prop-types,react/no-unused-state */
import React from 'react'
import styled from 'styled-components'
import { th, grid } from '@pubsweet/ui-toolkit'
import { Formik } from 'formik'
import { withTranslation } from "react-i18next";
import { Button } from '../../../../ui'
import FormModal from '../../../common/src/FormModal'

const Input = styled.input`
  border: 0;
  border-bottom: 1px dashed
    ${({ errors }) => (errors.title ? th('colorError') : th('colorText'))};
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin-bottom: calc(${th('gridUnit')});
  outline: 0;
  text-align: center;
  width: 100%;

  &:focus {
    border-bottom: 1px dashed ${th('colorPrimary')};
    outline: 0;
  }

  &:placeholder-shown {
    font-size: ${th('fontSizeBase')};
    line-height: ${th('lineHeightBase')};
  }
`

const Text = styled.div`
  color: ${th('colorText')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  line-height: ${th('lineHeightBase')};
  margin-bottom: ${grid(3)};
  text-align: center;
  width: 100%;
`

const Error = styled.div`
  color: ${th('colorError')};
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: ${th('lineHeightBase')};
  line-height: ${th('lineHeightBase')};
  text-align: left;
  width: 100%;
`

const StyledFormik = styled(Formik)`
  height: 100%;
  width: 100%;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`

const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
`

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  > button {
    margin-right: ${grid(1)};
  }
`

class AddBookModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: false, title: '' }
  }

  renderBody() {
    const { data ,t} = this.props
    const { onConfirm, hideModal } = data

    const save = t('save') // 'Save'
    const cancel = t('cancel') // 'Cancel'
    const titelOfTheBookShouldNotBeEmpty= t('titel_of_the_book_should_not_be_empty')
    const enterTheTitleOfTheNewBook = t('enter_the_title_of_the_new_book')
    const egMyNewTitle = t('eg_my_new_title')
    return (
      <StyledFormik
        initialValues={{ title: '' }}
        onSubmit={(values, { setSubmitting }) => {
          const { title } = values

          onConfirm(title.trim())
          setSubmitting(false)
        }}
        validate={values => {
          const errors = {}

          if (!values.title) {
            errors.title = titelOfTheBookShouldNotBeEmpty // '* The title of the book should not be empty'
          }

          return errors
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Body>
              {/* <Text>Enter the title of the new book</Text> */}
              <Text>{enterTheTitleOfTheNewBook}</Text>
              <Input
                errors={errors}
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={egMyNewTitle}
                type="text"
                value={values.title}
              />
              <Error>{errors.title && touched.title && errors.title}</Error>
            </Body>
            <Footer>
              <Button
                disabled={isSubmitting || errors.title}
                label={save}
                title={save}
                type="submit"
              />
              <Button
                danger
                label={cancel}
                onClick={hideModal}
                title={cancel}
              />
            </Footer>
          </StyledForm>
        )}
      </StyledFormik>
    )
  }

  render() {
    const { isOpen, hideModal , t } = this.props

    const createANewBook = t('create_a_new_book') // "Create a new Book"

    const body = this.renderBody()
    return (
      <FormModal
        headerText={createANewBook}
        isOpen={isOpen}
        onRequestClose={hideModal}
        size="small"
      >
        {body}
      </FormModal>
    )
  }
}

// export default AddBookModal
export default withTranslation()(AddBookModal);
